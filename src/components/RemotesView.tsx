import { theme } from '../theme'
import { Fieldset } from './Fieldset'
import type { GitRemote } from '../types/git'

interface RemotesViewProps {
  remotes: GitRemote[]
  selectedIndex: number
  focused: boolean
}

export function RemotesView({ remotes, selectedIndex, focused }: RemotesViewProps) {
  return (
    <Fieldset
      title={`Remotes (${remotes.length})`}
      focused={focused}
      flexGrow={1}
      paddingX={theme.spacing.xs}
      paddingY={theme.spacing.xs}
    >
      <box width="100%" flexDirection="column">
        {remotes.length === 0 ? (
          <text fg={theme.colors.text.muted}>No remotes configured</text>
        ) : (
          remotes.map((remote, idx) => {
            const isSelected = idx === selectedIndex
            const bg = isSelected && focused ? theme.colors.primary : undefined
            const fg = isSelected && focused ? theme.colors.text.primary : theme.colors.text.secondary

            return (
              <box key={remote.name} width="100%" flexDirection="column">
                <box width="100%" backgroundColor={bg}>
                  <text fg={fg}>{isSelected ? '▶ ' : '  '}</text>
                  <text fg={isSelected && focused ? theme.colors.text.primary : theme.colors.primary}>{remote.name}</text>
                </box>
                <box width="100%" paddingLeft={theme.spacing.md}>
                  <text fg={theme.colors.text.muted}>fetch: </text>
                  <text fg={theme.colors.text.secondary}>{remote.fetchUrl}</text>
                </box>
                {remote.pushUrl !== remote.fetchUrl && (
                  <box width="100%" paddingLeft={theme.spacing.md}>
                    <text fg={theme.colors.text.muted}>push:  </text>
                    <text fg={theme.colors.text.secondary}>{remote.pushUrl}</text>
                  </box>
                )}
              </box>
            )
          })
        )}
      </box>
    </Fieldset>
  )
}
