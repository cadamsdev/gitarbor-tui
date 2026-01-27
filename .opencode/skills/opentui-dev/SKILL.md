---
name: opentui-dev
description: Build and modify terminal user interfaces using OpenTUI with React or Core API. Use when implementing terminal UIs, TUIs, CLI applications, interactive terminal components, keyboard navigation, terminal styling, or working on OpenTUI-based applications.
license: MIT
compatibility: Requires Bun (v1.2.0+), TypeScript. Zig required for building native modules (optional for development).
metadata:
  author: gitarbor
  version: "1.0"
  framework: opentui
  ui-type: terminal
---

# OpenTUI Development Skill

This skill provides comprehensive guidance for building terminal user interfaces (TUIs) using OpenTUI, a TypeScript library for creating component-based terminal applications with React or Core API.

## When to use this skill

Use this skill when:
- Building a new terminal user interface (TUI) or CLI application
- Working with OpenTUI-based projects
- Creating interactive terminal components (inputs, selects, lists, etc.)
- Implementing keyboard navigation and event handling in terminals
- Adding syntax highlighting or code display in terminal UIs
- Creating diff viewers, text editors, or terminal-based forms
- Styling terminal applications with borders, colors, and flexbox layouts
- Debugging or enhancing OpenTUI applications
- User mentions: TUI, terminal UI, CLI app, OpenTUI, terminal components

## What is OpenTUI

OpenTUI is a TypeScript framework for building terminal user interfaces with:
- **Component-based architecture**: Similar to web frameworks, compose UIs from reusable components
- **React integration**: Use familiar React patterns with JSX for declarative terminal UIs
- **Flexbox layouts**: CSS Flexbox-like layout system powered by Yoga layout engine
- **Rich components**: Built-in inputs, selects, code viewers, diff viewers, and more
- **Type-safe**: Full TypeScript support with strict mode
- **High performance**: Native Zig rendering layer for optimal performance

### Core Packages

- `@opentui/core` - Core library with imperative API and primitives (standalone)
- `@opentui/react` - React reconciler for declarative UI development
- `@opentui/solid` - SolidJS reconciler (alternative framework)

## Quick Start

### Creating a new OpenTUI React project

```bash
bun create tui --template react
cd my-tui-app
bun install
bun run index.tsx
```

### Manual installation

```bash
bun install @opentui/core @opentui/react react
```

### Basic "Hello World" example

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"

function App() {
  return (
    <box style={{ padding: 2 }}>
      <text fg="#00FF00">Hello, OpenTUI!</text>
    </box>
  )
}

const renderer = await createCliRenderer({ useAlternateScreen: true })
createRoot(renderer).render(<App />)
renderer.start()
```

## TypeScript Configuration

OpenTUI requires specific TypeScript settings:

```json
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "jsxImportSource": "@opentui/react",
    "strict": true,
    "skipLibCheck": true
  }
}
```

Key settings:
- `jsxImportSource: "@opentui/react"` - Use OpenTUI's JSX factory
- `moduleResolution: "bundler"` - Required for Bun
- `strict: true` - Enable strict type checking

## Core Concepts

### 1. Renderer

The renderer manages terminal output, input events, and the rendering loop.

```typescript
import { createCliRenderer } from "@opentui/core"

const renderer = await createCliRenderer({
  exitOnCtrlC: true,           // Exit on Ctrl+C (default: true)
  targetFps: 30,               // Target frame rate
  maxFps: 60,                  // Maximum frame rate
  useAlternateScreen: true,    // Use alternate screen (full-screen)
  useMouse: true,              // Enable mouse support
  backgroundColor: "#000000",   // Background color
  useConsole: true,            // Enable console overlay
})

// Start the render loop
renderer.start()
```

**Rendering Modes:**
- **Live Mode**: Call `renderer.start()` for continuous rendering at target FPS
- **On-Demand**: Without `start()`, renders only when changes occur

### 2. Layout System (Flexbox)

OpenTUI uses Yoga for CSS Flexbox-like layouts:

```tsx
<box
  flexDirection="row"          // row | column | row-reverse | column-reverse
  justifyContent="center"      // flex-start | flex-end | center | space-between | space-around
  alignItems="center"          // flex-start | flex-end | center | stretch | baseline
  gap={2}                      // Gap between children
  flexGrow={1}                 // Grow factor
  flexShrink={1}               // Shrink factor
  flexBasis="auto"             // Base size
  flexWrap="wrap"              // no-wrap | wrap | wrap-reverse
>
  {/* Children */}
</box>
```

**Size Properties:**
```tsx
width={40}           // Fixed width in characters
height={10}          // Fixed height in lines
width="50%"          // Percentage of parent
width="auto"         // Auto-size based on content
minWidth={20}        // Minimum width
maxWidth={80}        // Maximum width
```

**Spacing:**
```tsx
padding={2}          // All sides
paddingLeft={1}      // Individual sides
margin={1}           // Margin (all sides)
marginTop={2}        // Individual margins
```

**Position:**
```tsx
position="relative"  // relative | absolute
top={5}             // Position from top
left={10}           // Position from left
zIndex={999}        // Stack order
```

### 3. Colors

Colors in OpenTUI use RGBA format or hex strings:

```tsx
import { RGBA } from "@opentui/core"

// Hex strings (most common)
<text fg="#FFFFFF" bg="#000000">Text</text>

// RGBA objects
const red = RGBA.fromHex("#FF0000")
const blue = RGBA.fromInts(0, 0, 255, 255)  // RGB 0-255
const transparent = RGBA.fromValues(1.0, 1.0, 1.0, 0.5)  // RGBA 0.0-1.0
```

### 4. Text Attributes

Style text with bold, italic, underline, etc.:

```tsx
import { TextAttributes } from "@opentui/core"

<text attributes={TextAttributes.BOLD}>Bold text</text>
<text attributes={TextAttributes.BOLD | TextAttributes.ITALIC}>Bold italic</text>

// Available attributes:
// BOLD, DIM, ITALIC, UNDERLINE, BLINK, INVERSE, HIDDEN, STRIKETHROUGH
```

## React Components

### Box Component

Container with borders, backgrounds, and layout:

```tsx
<box
  title="Panel Title"
  border                       // Show border
  borderStyle="single"         // single | double | rounded | bold | classic
  borderColor="#FFFFFF"
  backgroundColor="#1a1a1a"
  focused={true}               // Highlight when focused
  padding={2}
  flexDirection="column"
  width={40}
  height={10}
>
  <text>Content</text>
</box>
```

**Border Styles:**
- `single` - Single line (─│┌┐└┘)
- `double` - Double line (═║╔╗╚╝)
- `rounded` - Rounded corners (─│╭╮╰╯)
- `bold` - Bold/thick line
- `classic` - ASCII style (+-|)

### Text Component

Display text with styling:

```tsx
// Simple text
<text fg="#FFFFFF" bg="#000000">Simple text</text>

// Rich text with children
<text>
  <span fg="#FF0000">Red text</span>
  {" "}
  <strong>Bold</strong>
  {" "}
  <em>Italic</em>
  {" "}
  <u>Underlined</u>
  <br />
  <a href="https://example.com">Link</a>
</text>

// Formatted content
<text content="Preformatted content" fg="#00FF00" />
```

### Input Component

Single-line text input:

```tsx
const [value, setValue] = useState("")

<input
  placeholder="Type here..."
  value={value}
  focused={true}               // Must be focused to receive input
  onInput={setValue}           // Called on every keystroke
  onSubmit={(val) => {         // Called on Enter key
    console.log("Submitted:", val)
  }}
  style={{
    backgroundColor: "#1a1a1a",
    focusedBackgroundColor: "#2a2a2a",
  }}
/>
```

### Textarea Component

Multi-line text editor:

```tsx
import { useRef } from "react"
import type { TextareaRenderable } from "@opentui/core"

const textareaRef = useRef<TextareaRenderable>(null)

<textarea
  ref={textareaRef}
  placeholder="Type here..."
  focused={true}
  initialValue="Initial text"
  style={{ width: 60, height: 10 }}
/>

// Access value: textareaRef.current?.getText()
```

### Select Component

List selection with scrolling:

```tsx
import type { SelectOption } from "@opentui/core"

const options: SelectOption[] = [
  { name: "Option 1", description: "First option", value: "opt1" },
  { name: "Option 2", description: "Second option", value: "opt2" },
  { name: "Option 3", description: "Third option", value: "opt3" },
]

<select
  options={options}
  focused={true}
  onChange={(index, option) => {
    console.log(`Selected ${index}:`, option)
  }}
  showScrollIndicator
  style={{ height: 10 }}
/>
```

**Navigation:**
- Up/Down arrows - Move selection
- Enter - Confirm selection
- Auto-scrolls to keep selection visible

### Tab Select Component

Horizontal tab selection:

```tsx
<tab-select
  options={[
    { name: "Home", description: "Dashboard view" },
    { name: "Settings", description: "Configuration" },
    { name: "Help", description: "Documentation" },
  ]}
  focused={true}
  onChange={(index, option) => {
    console.log("Tab changed:", option.name)
  }}
  tabWidth={20}
/>
```

### Scrollbox Component

Scrollable container for long content:

```tsx
<scrollbox
  focused={true}
  style={{
    height: 20,
    rootOptions: { backgroundColor: "#24283b" },
    wrapperOptions: { backgroundColor: "#1f2335" },
    viewportOptions: { backgroundColor: "#1a1b26" },
    contentOptions: { backgroundColor: "#16161e" },
    scrollbarOptions: {
      showArrows: true,
      trackOptions: {
        foregroundColor: "#7aa2f7",
        backgroundColor: "#414868",
      },
    },
  }}
>
  {/* Long scrollable content */}
  <text>Line 1</text>
  <text>Line 2</text>
  {/* ... many more lines */}
</scrollbox>
```

### Code Component

Display code with syntax highlighting:

```tsx
import { SyntaxStyle, RGBA } from "@opentui/core"

const syntaxStyle = SyntaxStyle.fromStyles({
  keyword: { fg: RGBA.fromHex("#ff6b6b"), bold: true },
  string: { fg: RGBA.fromHex("#51cf66") },
  comment: { fg: RGBA.fromHex("#868e96"), italic: true },
  function: { fg: RGBA.fromHex("#4dabf7") },
  number: { fg: RGBA.fromHex("#ffd43b") },
})

<code
  content={codeString}
  filetype="typescript"        // javascript, python, rust, go, etc.
  syntaxStyle={syntaxStyle}
/>
```

### Line Number Component

Code with line numbers and diff highlights:

```tsx
import { useRef, useEffect } from "react"
import type { LineNumberRenderable } from "@opentui/core"

const lineNumberRef = useRef<LineNumberRenderable>(null)

useEffect(() => {
  // Highlight added line
  lineNumberRef.current?.setLineColor(1, "#1a4d1a")
  lineNumberRef.current?.setLineSign(1, { after: " +", afterColor: "#22c55e" })
  
  // Highlight deleted line
  lineNumberRef.current?.setLineColor(5, "#4d1a1a")
  lineNumberRef.current?.setLineSign(5, { after: " -", afterColor: "#ef4444" })
  
  // Add diagnostic warning
  lineNumberRef.current?.setLineSign(10, { before: "⚠️", beforeColor: "#f59e0b" })
}, [])

<line-number
  ref={lineNumberRef}
  fg="#6b7280"
  bg="#161b22"
  minWidth={3}
  showLineNumbers={true}
>
  <code content={codeContent} filetype="typescript" />
</line-number>
```

### Diff Component

Unified or split diff viewer:

```tsx
<diff
  oldContent={oldCode}
  newContent={newCode}
  filetype="typescript"
  syntaxStyle={syntaxStyle}
  viewMode="unified"           // unified | split
/>
```

### ASCII Font Component

Display ASCII art text:

```tsx
<ascii-font
  text="OPENTUI"
  font="block"                 // tiny | block | slick | shade
  color={RGBA.fromHex("#00FF00")}
/>
```

## React Hooks

### useRenderer()

Access the renderer instance:

```tsx
import { useRenderer } from "@opentui/react"

const renderer = useRenderer()

// Show/hide console overlay
renderer.console.toggle()
renderer.console.show()
renderer.console.hide()
```

### useKeyboard(handler, options?)

Handle keyboard events:

```tsx
import { useKeyboard } from "@opentui/react"
import type { KeyEvent } from "@opentui/core"

useKeyboard((key: KeyEvent) => {
  console.log("Key:", key.name)
  console.log("Modifiers:", { ctrl: key.ctrl, shift: key.shift, alt: key.meta })
  
  if (key.name === "escape") {
    process.exit(0)
  }
  
  if (key.ctrl && key.name === "s") {
    // Save action
  }
}, { release: false })  // Set release: true for key release events
```

**Key Event Properties:**
- `name` - Key name (e.g., "a", "enter", "escape", "up", "down")
- `ctrl` - Ctrl key pressed
- `shift` - Shift key pressed
- `meta` - Alt/Meta key pressed (Linux/Windows)
- `option` - Option key pressed (macOS)
- `sequence` - Raw key sequence

### useTerminalDimensions()

Get current terminal size (auto-updates on resize):

```tsx
import { useTerminalDimensions } from "@opentui/react"

const { width, height } = useTerminalDimensions()

return (
  <box style={{ width, height }}>
    <text>{`Terminal: ${width}x${height}`}</text>
  </box>
)
```

### useOnResize(callback)

Handle terminal resize events:

```tsx
import { useOnResize } from "@opentui/react"

useOnResize((width, height) => {
  console.log(`Resized to ${width}x${height}`)
})
```

### useTimeline(options?)

Create animations:

```tsx
import { useTimeline } from "@opentui/react"
import { useEffect, useState } from "react"

const [width, setWidth] = useState(0)

const timeline = useTimeline({
  duration: 2000,
  loop: false,
  autoplay: true,
})

useEffect(() => {
  timeline.add(
    { width },
    {
      width: 50,
      duration: 2000,
      ease: "linear",
      onUpdate: (animation) => {
        setWidth(animation.targets[0].width)
      },
    }
  )
}, [])

return <box style={{ width }}><text>Animating...</text></box>
```

## Common Patterns

### Multi-view Application

```tsx
import { useState } from "react"
import { useKeyboard } from "@opentui/react"

type View = "home" | "settings" | "help"

function App() {
  const [view, setView] = useState<View>("home")

  useKeyboard((key) => {
    if (key.name === "1") setView("home")
    if (key.name === "2") setView("settings")
    if (key.name === "3") setView("help")
    if (key.name === "escape") process.exit(0)
  })

  return (
    <box style={{ flexDirection: "column", width: "100%", height: "100%" }}>
      <Header view={view} />
      {view === "home" && <HomeView />}
      {view === "settings" && <SettingsView />}
      {view === "help" && <HelpView />}
      <Footer />
    </box>
  )
}
```

### Modal Pattern

```tsx
import { useState } from "react"
import { useKeyboard } from "@opentui/react"

function App() {
  const [showModal, setShowModal] = useState(false)

  useKeyboard((key) => {
    if (showModal) return  // Modal handles its own keys
    
    if (key.name === "m") {
      setShowModal(true)
    }
  })

  return (
    <>
      <MainContent />
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

function Modal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("")
  
  useKeyboard((key) => {
    if (key.name === "escape") onClose()
  })

  return (
    <box
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 60,
        height: 10,
        backgroundColor: "#1a1a1a",
        border: true,
        borderColor: "#FFFFFF",
      }}
    >
      <input
        placeholder="Enter value..."
        value={input}
        focused={true}
        onInput={setInput}
        onSubmit={(val) => {
          console.log("Submitted:", val)
          onClose()
        }}
      />
    </box>
  )
}
```

### Focus Management

```tsx
import { useState } from "react"
import { useKeyboard } from "@opentui/react"

type FocusPanel = "left" | "right"

function App() {
  const [focused, setFocused] = useState<FocusPanel>("left")

  useKeyboard((key) => {
    if (key.name === "tab") {
      setFocused(focused === "left" ? "right" : "left")
    }
  })

  return (
    <box style={{ flexDirection: "row", width: "100%", height: "100%" }}>
      <box
        title="Left Panel"
        style={{ flexGrow: 1, border: true }}
        focused={focused === "left"}
      >
        <text>Content</text>
      </box>
      <box
        title="Right Panel"
        style={{ flexGrow: 1, border: true }}
        focused={focused === "right"}
      >
        <text>Content</text>
      </box>
    </box>
  )
}
```

### List with Selection

```tsx
import { useState } from "react"
import { useKeyboard } from "@opentui/react"

function FileList({ files }: { files: string[] }) {
  const [selected, setSelected] = useState(0)

  useKeyboard((key) => {
    if (key.name === "up") {
      setSelected(Math.max(0, selected - 1))
    }
    if (key.name === "down") {
      setSelected(Math.min(files.length - 1, selected + 1))
    }
    if (key.name === "enter") {
      console.log("Selected:", files[selected])
    }
  })

  return (
    <box style={{ flexDirection: "column" }}>
      {files.map((file, idx) => (
        <text
          key={file}
          fg={idx === selected ? "#00FF00" : "#FFFFFF"}
          bg={idx === selected ? "#333333" : undefined}
        >
          {idx === selected ? "> " : "  "}
          {file}
        </text>
      ))}
    </box>
  )
}
```

### Responsive Layout

```tsx
import { useTerminalDimensions } from "@opentui/react"

function App() {
  const { width, height } = useTerminalDimensions()
  
  // Show simplified layout on small terminals
  const isSmall = width < 80

  return (
    <box style={{ flexDirection: isSmall ? "column" : "row", width, height }}>
      <Sidebar width={isSmall ? width : 30} />
      <MainContent width={isSmall ? width : width - 30} />
    </box>
  )
}
```

### Loading Spinner

```tsx
import { useState, useEffect } from "react"

function Spinner() {
  const [frame, setFrame] = useState(0)
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return <text fg="#00FFFF">{frames[frame]} Loading...</text>
}
```

## Code Style Guidelines

### Import Order

1. External dependencies (React, etc.)
2. OpenTUI packages
3. Internal utilities
4. Components
5. Type imports (with `type` keyword)

```tsx
import { useState, useEffect } from "react"
import { useKeyboard, useRenderer } from "@opentui/react"
import { RGBA, TextAttributes } from "@opentui/core"
import { formatTime } from "./utils"
import { Header } from "./components/Header"
import type { AppState, View } from "./types"
```

### Naming Conventions

- **camelCase**: variables, functions, parameters
- **PascalCase**: components, classes, types/interfaces
- **UPPER_CASE**: constants

```tsx
// Good
const userInput = "text"
function handleSubmit() {}
interface UserData {}
const MAX_RETRIES = 3

// Bad
const UserInput = "text"
function HandleSubmit() {}
interface userData {}
```

### Component Structure

```tsx
interface ComponentProps {
  title: string
  items: string[]
}

export function Component({ title, items }: ComponentProps) {
  // 1. Hooks
  const [selected, setSelected] = useState(0)
  const renderer = useRenderer()
  
  // 2. Event handlers
  useKeyboard((key) => {
    if (key.name === "escape") process.exit(0)
  })
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [])
  
  // 4. Helper functions
  const handleSelect = (index: number) => {
    setSelected(index)
  }
  
  // 5. JSX return
  return (
    <box>
      <text>{title}</text>
      {/* Content */}
    </box>
  )
}
```

## Best Practices

### Performance

1. **Minimize re-renders**: Use `useMemo` and `useCallback` for expensive computations
2. **Avoid frequent updates**: Throttle or debounce rapid state changes
3. **Use keys properly**: Provide stable keys for lists to optimize reconciliation
4. **Optimize large lists**: Use virtualization or pagination for long lists

### Focus Management

1. **Only one focused component**: Ensure only one input/select has `focused={true}` at a time
2. **Keyboard routing**: Check focus state before handling keyboard events
3. **Visual feedback**: Use `focused` prop on boxes to show focus state with borders

### Layout Tips

1. **Use flexbox**: Leverage `flexDirection`, `justifyContent`, `alignItems` for layouts
2. **Percentage widths**: Use `"50%"` for responsive layouts
3. **flexGrow/flexShrink**: Use for responsive sizing
4. **Absolute positioning**: Use sparingly for modals/overlays

### Debugging

1. **Console overlay**: Use `renderer.console.show()` instead of `console.log`
2. **Toggle console**: Press backtick (`) to toggle console visibility
3. **Environment variables**: Set `OTUI_DEBUG=true` for debug mode
4. **Stats overlay**: Set `OTUI_SHOW_STATS=true` to see performance stats

### Error Handling

1. **Graceful degradation**: Handle terminal resize and small screens
2. **Input validation**: Validate user input before processing
3. **Error boundaries**: Wrap components in error boundaries for production

## Common Gotchas

1. **Console captured**: `console.log` goes to overlay, use `renderer.console.show()` to view
2. **Focus required**: Inputs/selects need `focused={true}` to receive events
3. **Bun only**: OpenTUI is designed for Bun runtime, not Node.js
4. **Zig for builds**: Only needed when modifying native code, not for TypeScript changes
5. **Alternate screen**: Default is full-screen mode, use `useAlternateScreen: false` to disable
6. **Key names**: Use lowercase names ("a", "enter", "escape"), not "A", "Enter", "Escape"

## Troubleshooting

### Application not rendering

- Ensure you called `renderer.start()` after `createRoot().render()`
- Check terminal supports ANSI escape codes
- Try disabling alternate screen: `useAlternateScreen: false`

### Keyboard input not working

- Ensure component has `focused={true}`
- Check if modal or overlay is capturing input
- Verify `useKeyboard` hook is registered

### Layout issues

- Check parent has explicit dimensions (`width`, `height`)
- Use `flexGrow` for flexible sizing
- Ensure `flexDirection` is set correctly
- Use browser DevTools-like thinking (Yoga = Flexbox)

### Colors not showing

- Verify terminal supports 24-bit color
- Use hex format: `"#RRGGBB"`
- Check color values are valid (0-255 for RGB)

## Reference Documentation

For detailed API references and advanced topics, see:
- [Component API Reference](references/COMPONENT_API.md) - Complete component props and options
- [Core API Reference](references/CORE_API.md) - Low-level Core package API
- [Layout Guide](references/LAYOUT.md) - In-depth Yoga/Flexbox layout guide
- [Styling Guide](references/STYLING.md) - Colors, text attributes, and styling patterns

## Examples

The OpenTUI repository contains many examples:
- Basic counter app
- Login form with validation
- File explorer with keyboard navigation
- Code viewer with syntax highlighting
- Git diff viewer
- Multi-view dashboard
- Modal dialogs
- Tab navigation

## Resources

- **GitHub**: https://github.com/anomalyco/opentui
- **NPM Core**: https://www.npmjs.com/package/@opentui/core
- **NPM React**: https://www.npmjs.com/package/@opentui/react
- **Awesome OpenTUI**: https://github.com/msmps/awesome-opentui
- **Create TUI**: https://github.com/msmps/create-tui

## Development Commands

```bash
# Install dependencies
bun install

# Run application
bun run index.tsx

# Type check
bun --bun tsc --noEmit

# Build project (if applicable)
bun run build
```

## Next Steps

After implementing a basic OpenTUI application:

1. **Add keyboard shortcuts**: Implement common shortcuts (Ctrl+Q, etc.)
2. **Create themes**: Extract colors to theme objects for consistency
3. **Add help screen**: Show keyboard shortcuts and commands
4. **Implement error handling**: Gracefully handle edge cases
5. **Optimize performance**: Profile and optimize render performance
6. **Add tests**: Write unit tests for components and logic
7. **Document usage**: Add README with screenshots and usage guide
