import { useState, useEffect, useCallback } from 'react'
import { useKeyboard } from '@opentui/react'
import { theme } from '../theme'

interface DiffViewProps {
  diff: string
  focused: boolean
}

interface DiffMetadata {
  isBinary: boolean
  modeChange?: { old: string; new: string }
  filePath?: string
}

export function DiffView({ diff, focused }: DiffViewProps) {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(30) // Default viewport height
  
  const lines = diff.split('\n')
  const metadata = parseDiffMetadata(diff)

  // Reset scroll when diff changes
  useEffect(() => {
    setScrollOffset(0)
  }, [diff])

  // Calculate visible lines based on scroll offset
  const visibleLines = lines.slice(scrollOffset, scrollOffset + viewportHeight)

  const getLineColor = (line: string): string => {
    if (line.startsWith('+')) return theme.colors.git.added
    if (line.startsWith('-')) return theme.colors.git.deleted
    if (line.startsWith('@@')) return theme.colors.status.info
    if (line.startsWith('diff') || line.startsWith('index')) return theme.colors.text.muted
    if (line.startsWith('new file mode') || line.startsWith('deleted file mode')) return theme.colors.status.warning
    if (line.startsWith('old mode') || line.startsWith('new mode')) return theme.colors.status.warning
    if (line.startsWith('Binary files')) return theme.colors.status.warning
    return theme.colors.text.secondary
  }

  const getFileExtension = (filePath?: string): string | undefined => {
    if (!filePath) return undefined
    const parts = filePath.split('.')
    return parts.length > 1 ? parts[parts.length - 1] : undefined
  }

  const highlightSyntax = (line: string, ext?: string): string => {
    // Basic syntax highlighting for common languages
    // This is a simple implementation - for production, consider using a proper syntax highlighter
    
    // Skip diff markers
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      return line
    }

    // For TypeScript/JavaScript/JSX/TSX
    if (ext && ['ts', 'tsx', 'js', 'jsx'].includes(ext)) {
      // Highlight keywords (simplified - only applied to visual representation)
      const keywords = ['import', 'export', 'const', 'let', 'var', 'function', 'class', 'interface', 'type', 'async', 'await', 'return', 'if', 'else', 'for', 'while', 'switch', 'case']
      // In a real terminal, we can't apply multiple colors to a single line easily
      // This is a placeholder for future enhancement with proper syntax highlighting
      return line
    }

    return line
  }

  const findWordDifferences = (removedLine: string, addedLine: string): { removed: string; added: string } => {
    // Simple word-level diff - compares words and highlights differences
    const removedWords = removedLine.substring(1).split(/(\s+)/)
    const addedWords = addedLine.substring(1).split(/(\s+)/)
    
    // For terminal rendering limitations, we'll return the original lines
    // In a more advanced implementation, we could use terminal escape codes for inline highlighting
    return {
      removed: removedLine,
      added: addedLine,
    }
  }

  const highlightLine = (line: string, index: number): string => {
    // Check if next line is a corresponding addition/deletion for word-level diff
    const ext = getFileExtension(metadata.filePath)
    const highlighted = highlightSyntax(line, ext)
    
    // Word-level highlighting would require analyzing pairs of removed/added lines
    // For now, we return the syntax-highlighted line
    // Future enhancement: detect changed words within modified lines and highlight them differently
    
    return highlighted
  }

  // Keyboard navigation for scrolling
  useKeyboard((key) => {
    if (!focused) return

    if (key.name === 'up') {
      setScrollOffset((prev) => Math.max(0, prev - 1))
    } else if (key.name === 'down') {
      setScrollOffset((prev) => Math.min(Math.max(0, lines.length - viewportHeight), prev + 1))
    } else if (key.name === 'pageup') {
      setScrollOffset((prev) => Math.max(0, prev - viewportHeight))
    } else if (key.name === 'pagedown') {
      setScrollOffset((prev) => Math.min(Math.max(0, lines.length - viewportHeight), prev + viewportHeight))
    } else if (key.sequence === 'g') {
      // Go to top
      setScrollOffset(0)
    } else if (key.sequence === 'G') {
      // Go to bottom
      setScrollOffset(Math.max(0, lines.length - viewportHeight))
    }
  })

  const renderHeader = () => {
    const parts: string[] = []
    
    if (metadata.filePath) {
      parts.push(`File: ${metadata.filePath}`)
    }
    
    if (metadata.isBinary) {
      parts.push('[Binary]')
    }
    
    if (metadata.modeChange) {
      parts.push(`Mode: ${metadata.modeChange.old} → ${metadata.modeChange.new}`)
    }

    const scrollInfo = lines.length > viewportHeight 
      ? ` [${scrollOffset + 1}-${Math.min(scrollOffset + viewportHeight, lines.length)}/${lines.length}]`
      : ` [${lines.length} lines]`

    return (
      <box flexDirection="row">
        <text fg={theme.colors.text.primary}>Diff View</text>
        {parts.length > 0 && <text fg={theme.colors.text.secondary}> - {parts.join(' ')}</text>}
        <text fg={theme.colors.text.muted}>{scrollInfo}</text>
      </box>
    )
  }

  return (
    <box
      width="100%"
      flexGrow={1}
      borderStyle={theme.borders.style}
      borderColor={focused ? theme.colors.borderFocused : theme.colors.border}
      padding={theme.spacing.none}
    >
      <box paddingLeft={theme.spacing.xs} paddingTop={theme.spacing.none} flexDirection="column">
        {renderHeader()}
        {!diff || diff.trim() === '' ? (
          <text fg={theme.colors.text.muted}>No changes to display</text>
        ) : metadata.isBinary ? (
          <box flexDirection="column">
            <text fg={theme.colors.status.warning}>Binary file - cannot display diff</text>
            {metadata.filePath && <text fg={theme.colors.text.muted}>{metadata.filePath}</text>}
          </box>
        ) : (
          visibleLines.map((line, idx) => (
            <text key={scrollOffset + idx} fg={getLineColor(line)}>
              {highlightLine(line, idx)}
            </text>
          ))
        )}
        {focused && lines.length > viewportHeight && (
          <text fg={theme.colors.text.muted}>
            Use ↑↓ to scroll, PgUp/PgDn for page scroll, g/G for top/bottom
          </text>
        )}
      </box>
    </box>
  )
}

function parseDiffMetadata(diff: string): DiffMetadata {
  const lines = diff.split('\n')
  const metadata: DiffMetadata = {
    isBinary: false,
  }

  for (const line of lines) {
    // Check for binary files
    if (line.startsWith('Binary files')) {
      metadata.isBinary = true
    }

    // Extract file path from diff header
    if (line.startsWith('diff --git')) {
      const match = line.match(/diff --git a\/(.+) b\/(.+)/)
      if (match && match[2]) {
        metadata.filePath = match[2]
      }
    }

    // Check for mode changes
    if (line.startsWith('old mode')) {
      const oldMode = line.replace('old mode ', '')
      metadata.modeChange = { old: oldMode, new: '' }
    }
    if (line.startsWith('new mode') && metadata.modeChange) {
      const newMode = line.replace('new mode ', '')
      metadata.modeChange.new = newMode
    }
  }

  return metadata
}
