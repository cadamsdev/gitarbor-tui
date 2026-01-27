# OpenTUI Component API Reference

Comprehensive reference for all OpenTUI React components and their properties.

## Box Component

Container with borders, backgrounds, and flexbox layout.

### Props

```typescript
interface BoxProps {
  // Content
  title?: string                    // Title shown in top border
  children?: React.ReactNode        // Child components
  
  // Border
  border?: boolean                  // Show border
  borderStyle?: BorderStyle         // Border style
  borderColor?: string | RGBA       // Border color
  focused?: boolean                 // Highlight border when focused
  
  // Background
  backgroundColor?: string | RGBA    // Background color
  
  // Layout (Flexbox)
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  flexWrap?: "no-wrap" | "wrap" | "wrap-reverse"
  flexGrow?: number
  flexShrink?: number
  flexBasis?: number | "auto" | `${number}%`
  gap?: number | `${number}%`
  rowGap?: number | `${number}%`
  columnGap?: number | `${number}%`
  
  // Size
  width?: number | "auto" | `${number}%`
  height?: number | "auto" | `${number}%`
  minWidth?: number | "auto" | `${number}%`
  minHeight?: number | "auto" | `${number}%`
  maxWidth?: number | "auto" | `${number}%`
  maxHeight?: number | "auto" | `${number}%`
  
  // Spacing
  padding?: number | `${number}%`
  paddingTop?: number | `${number}%`
  paddingRight?: number | `${number}%`
  paddingBottom?: number | `${number}%`
  paddingLeft?: number | `${number}%`
  margin?: number | "auto" | `${number}%`
  marginTop?: number | "auto" | `${number}%`
  marginRight?: number | "auto" | `${number}%`
  marginBottom?: number | "auto" | `${number}%`
  marginLeft?: number | "auto" | `${number}%`
  
  // Position
  position?: "relative" | "absolute"
  top?: number | "auto" | `${number}%`
  right?: number | "auto" | `${number}%`
  bottom?: number | "auto" | `${number}%`
  left?: number | "auto" | `${number}%`
  zIndex?: number
  
  // Visibility
  visible?: boolean
  opacity?: number                  // 0.0-1.0
  overflow?: "visible" | "hidden" | "scroll"
  
  // Style prop (alternative to direct props)
  style?: Omit<BoxProps, "style" | "children" | "key" | "ref">
}

type BorderStyle = 
  | "single"      // ─│┌┐└┘
  | "double"      // ═║╔╗╚╝
  | "rounded"     // ─│╭╮╰╯
  | "bold"        // Bold/thick lines
  | "classic"     // ASCII +-|
  | "single-double"
  | "double-single"
```

### Example

```tsx
<box
  title="My Panel"
  border
  borderStyle="rounded"
  borderColor="#00FF00"
  backgroundColor="#1a1a1a"
  focused={true}
  padding={2}
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  width={60}
  height={20}
>
  <text>Content</text>
</box>
```

## Text Component

Display text with colors, attributes, and rich formatting.

### Props

```typescript
interface TextProps {
  // Content
  content?: string                  // Plain text content
  children?: React.ReactNode        // Rich text with child elements
  
  // Colors
  fg?: string | RGBA               // Foreground (text) color
  bg?: string | RGBA               // Background color
  
  // Attributes
  attributes?: TextAttributes       // Bitwise flags for styling
  
  // Layout (inherited from parent)
  width?: number | "auto" | `${number}%`
  height?: number | "auto" | `${number}%`
  // ... other layout props from BoxProps
  
  // Style prop
  style?: Omit<TextProps, "style" | "children" | "content" | "key" | "ref">
}

// Text attributes (can be combined with bitwise OR)
enum TextAttributes {
  NONE = 0,
  BOLD = 1,
  DIM = 2,
  ITALIC = 4,
  UNDERLINE = 8,
  BLINK = 16,
  INVERSE = 32,
  HIDDEN = 64,
  STRIKETHROUGH = 128,
}
```

### Rich Text Children

```tsx
<text>
  <span fg="red">Red text</span>
  {" "}
  <strong>Bold</strong>          {/* Equivalent to BOLD attribute */}
  {" "}
  <em>Italic</em>                {/* Equivalent to ITALIC attribute */}
  {" "}
  <u>Underlined</u>              {/* Equivalent to UNDERLINE attribute */}
  {" "}
  <s>Strikethrough</s>           {/* Equivalent to STRIKETHROUGH attribute */}
  <br />                          {/* Line break */}
  <a href="url">Link</a>         {/* Hyperlink (if terminal supports) */}
</text>
```

### Example

```tsx
// Simple text
<text fg="#FFFFFF" bg="#000000">
  Plain text
</text>

// Bold red text
<text 
  fg="#FF0000" 
  attributes={TextAttributes.BOLD}
>
  Important!
</text>

// Combined attributes
<text 
  fg="#00FF00"
  attributes={TextAttributes.BOLD | TextAttributes.ITALIC}
>
  Bold and Italic
</text>

// Rich text
<text>
  <span fg="#FF0000">Error:</span>
  {" "}
  <strong>Something went wrong</strong>
</text>
```

## Input Component

Single-line text input field.

### Props

```typescript
interface InputProps {
  // Content
  placeholder?: string              // Placeholder text
  value?: string                    // Current value
  initialValue?: string             // Initial value (uncontrolled)
  
  // Events
  onInput?: (value: string) => void        // Called on every keystroke
  onSubmit?: (value: string) => void       // Called on Enter key
  onChange?: (value: string) => void       // Alias for onInput
  
  // Focus
  focused?: boolean                 // Must be true to receive input
  
  // Styling
  style?: {
    backgroundColor?: string | RGBA
    focusedBackgroundColor?: string | RGBA
    foregroundColor?: string | RGBA
    focusedForegroundColor?: string | RGBA
    placeholderColor?: string | RGBA
    // ... layout props
  }
}
```

### Example

```tsx
const [username, setUsername] = useState("")

<box title="Username" style={{ border: true, width: 40, height: 3 }}>
  <input
    placeholder="Enter username..."
    value={username}
    focused={true}
    onInput={setUsername}
    onSubmit={(val) => console.log("Submitted:", val)}
    style={{
      backgroundColor: "#1a1a1a",
      focusedBackgroundColor: "#2a2a2a",
      foregroundColor: "#FFFFFF",
      placeholderColor: "#666666",
    }}
  />
</box>
```

## Textarea Component

Multi-line text editor with scrolling.

### Props

```typescript
interface TextareaProps {
  // Content
  placeholder?: string              // Placeholder text
  initialValue?: string             // Initial text (uncontrolled)
  
  // Focus
  focused?: boolean                 // Must be true to receive input
  
  // Ref
  ref?: React.Ref<TextareaRenderable>  // Access underlying renderable
  
  // Styling
  style?: {
    backgroundColor?: string | RGBA
    foregroundColor?: string | RGBA
    // ... layout props
  }
}

// Ref methods
interface TextareaRenderable {
  getText(): string                 // Get current text
  setText(text: string): void       // Set text programmatically
  // ... other methods
}
```

### Example

```tsx
const textareaRef = useRef<TextareaRenderable>(null)

<box title="Editor" style={{ border: true, width: 60, height: 15 }}>
  <textarea
    ref={textareaRef}
    placeholder="Type here..."
    focused={true}
    initialValue="Initial text"
    style={{
      backgroundColor: "#1a1a1a",
      foregroundColor: "#FFFFFF",
    }}
  />
</box>

// Get value
const text = textareaRef.current?.getText()

// Set value
textareaRef.current?.setText("New text")
```

## Select Component

Scrollable list selection with descriptions.

### Props

```typescript
interface SelectProps {
  // Options
  options: SelectOption[]           // List of options
  
  // Events
  onChange?: (index: number, option: SelectOption) => void
  
  // Focus
  focused?: boolean                 // Must be true for keyboard control
  
  // Display
  showScrollIndicator?: boolean     // Show ↑↓ scroll indicators
  
  // Styling
  style?: {
    height?: number                 // Visible height
    selectedBackgroundColor?: string | RGBA
    selectedForegroundColor?: string | RGBA
    // ... layout props
  }
}

interface SelectOption {
  name: string                      // Display name
  description?: string              // Optional description
  value?: any                       // Associated value
}
```

### Example

```tsx
const [selected, setSelected] = useState<string | null>(null)

const options: SelectOption[] = [
  { name: "Option 1", description: "First choice", value: "opt1" },
  { name: "Option 2", description: "Second choice", value: "opt2" },
  { name: "Option 3", description: "Third choice", value: "opt3" },
]

<box title="Select an option" style={{ border: true, height: 10 }}>
  <select
    options={options}
    focused={true}
    onChange={(index, option) => {
      console.log(`Selected index ${index}:`, option)
      setSelected(option.value)
    }}
    showScrollIndicator
    style={{
      height: 8,
      selectedBackgroundColor: "#333333",
      selectedForegroundColor: "#00FF00",
    }}
  />
</box>
```

**Keyboard navigation:**
- `↑` / `↓` - Move selection up/down
- `Enter` - Confirm selection (calls onChange)
- `Page Up` / `Page Down` - Scroll by page
- `Home` / `End` - Jump to first/last

## Tab Select Component

Horizontal tab selection.

### Props

```typescript
interface TabSelectProps {
  // Options
  options: SelectOption[]           // Tab options
  
  // Events
  onChange?: (index: number, option: SelectOption) => void
  
  // Focus
  focused?: boolean                 // Must be true for keyboard control
  
  // Display
  tabWidth?: number                 // Fixed width per tab (optional)
  
  // Styling
  style?: {
    selectedBackgroundColor?: string | RGBA
    selectedForegroundColor?: string | RGBA
    unselectedBackgroundColor?: string | RGBA
    unselectedForegroundColor?: string | RGBA
    // ... layout props
  }
}
```

### Example

```tsx
const [activeTab, setActiveTab] = useState(0)

<tab-select
  options={[
    { name: "Home", description: "Dashboard view" },
    { name: "Files", description: "File browser" },
    { name: "Settings", description: "Configuration" },
  ]}
  focused={true}
  onChange={(index, option) => {
    setActiveTab(index)
    console.log("Tab changed:", option.name)
  }}
  tabWidth={20}
  style={{
    selectedBackgroundColor: "#CC8844",
    selectedForegroundColor: "#000000",
    unselectedBackgroundColor: "#333333",
    unselectedForegroundColor: "#FFFFFF",
  }}
/>
```

**Keyboard navigation:**
- `←` / `→` - Move between tabs
- `Enter` - Confirm selection (calls onChange)

## Scrollbox Component

Scrollable container for long content.

### Props

```typescript
interface ScrollboxProps {
  // Children
  children: React.ReactNode         // Scrollable content
  
  // Focus
  focused?: boolean                 // Must be true for keyboard scrolling
  
  // Styling
  style?: {
    rootOptions?: {
      backgroundColor?: string | RGBA
      // ... layout props for root container
    }
    wrapperOptions?: {
      backgroundColor?: string | RGBA
      // ... layout props for wrapper
    }
    viewportOptions?: {
      backgroundColor?: string | RGBA
      // ... layout props for viewport
    }
    contentOptions?: {
      backgroundColor?: string | RGBA
      // ... layout props for content
    }
    scrollbarOptions?: {
      showArrows?: boolean          // Show ▲▼ arrows
      trackOptions?: {
        foregroundColor?: string | RGBA
        backgroundColor?: string | RGBA
      }
    }
    // ... layout props
  }
}
```

### Example

```tsx
<scrollbox
  focused={true}
  style={{
    height: 20,
    rootOptions: {
      backgroundColor: "#24283b",
    },
    wrapperOptions: {
      backgroundColor: "#1f2335",
    },
    viewportOptions: {
      backgroundColor: "#1a1b26",
    },
    contentOptions: {
      backgroundColor: "#16161e",
    },
    scrollbarOptions: {
      showArrows: true,
      trackOptions: {
        foregroundColor: "#7aa2f7",
        backgroundColor: "#414868",
      },
    },
  }}
>
  {/* Long content */}
  {Array.from({ length: 100 }, (_, i) => (
    <text key={i}>{`Line ${i + 1}`}</text>
  ))}
</scrollbox>
```

**Keyboard navigation:**
- `↑` / `↓` - Scroll line by line
- `Page Up` / `Page Down` - Scroll by page
- `Home` / `End` - Jump to top/bottom

## Code Component

Display code with syntax highlighting.

### Props

```typescript
interface CodeProps {
  // Content
  content: string                   // Code to display
  
  // Language
  filetype: string                  // Language identifier
  
  // Styling
  syntaxStyle?: SyntaxStyle         // Custom syntax highlighting
  
  // Layout
  style?: {
    // ... layout props
  }
}

// Create syntax style
class SyntaxStyle {
  static fromStyles(styles: Record<string, {
    fg?: RGBA
    bg?: RGBA
    bold?: boolean
    italic?: boolean
    underline?: boolean
  }>): SyntaxStyle
}
```

### Supported Languages

Common language identifiers:
- `"typescript"`, `"javascript"`, `"tsx"`, `"jsx"`
- `"python"`, `"rust"`, `"go"`, `"java"`, `"c"`, `"cpp"`
- `"html"`, `"css"`, `"json"`, `"yaml"`, `"toml"`
- `"markdown"`, `"bash"`, `"shell"`, `"dockerfile"`

### Example

```tsx
import { SyntaxStyle, RGBA } from "@opentui/core"

const syntaxStyle = SyntaxStyle.fromStyles({
  keyword: { fg: RGBA.fromHex("#ff6b6b"), bold: true },
  string: { fg: RGBA.fromHex("#51cf66") },
  comment: { fg: RGBA.fromHex("#868e96"), italic: true },
  function: { fg: RGBA.fromHex("#4dabf7") },
  number: { fg: RGBA.fromHex("#ffd43b") },
  operator: { fg: RGBA.fromHex("#cc5de8") },
  type: { fg: RGBA.fromHex("#339af0") },
})

const code = `
function hello(name: string): void {
  console.log(\`Hello, \${name}!\`)
}
`

<code
  content={code}
  filetype="typescript"
  syntaxStyle={syntaxStyle}
/>
```

## Line Number Component

Code with line numbers and diff/diagnostic highlights.

### Props

```typescript
interface LineNumberProps {
  // Children
  children: React.ReactElement      // Usually <code> component
  
  // Display
  showLineNumbers?: boolean         // Show line numbers (default: true)
  minWidth?: number                 // Minimum width for line number column
  
  // Colors
  fg?: string | RGBA               // Line number color
  bg?: string | RGBA               // Line number background
  
  // Ref
  ref?: React.Ref<LineNumberRenderable>
  
  // Styling
  style?: {
    // ... layout props
  }
}

// Ref methods
interface LineNumberRenderable {
  setLineColor(line: number, color: string | RGBA): void
  setLineSign(line: number, sign: LineSign): void
  clearLineColor(line: number): void
  clearLineSign(line: number): void
}

interface LineSign {
  before?: string                   // Sign before line number
  beforeColor?: string | RGBA
  after?: string                    // Sign after line number
  afterColor?: string | RGBA
}
```

### Example

```tsx
import { useRef, useEffect } from "react"
import type { LineNumberRenderable } from "@opentui/core"

const lineNumberRef = useRef<LineNumberRenderable>(null)

useEffect(() => {
  // Highlight added line (green)
  lineNumberRef.current?.setLineColor(1, "#1a4d1a")
  lineNumberRef.current?.setLineSign(1, { 
    after: " +", 
    afterColor: "#22c55e" 
  })
  
  // Highlight deleted line (red)
  lineNumberRef.current?.setLineColor(5, "#4d1a1a")
  lineNumberRef.current?.setLineSign(5, { 
    after: " -", 
    afterColor: "#ef4444" 
  })
  
  // Add diagnostic warning
  lineNumberRef.current?.setLineSign(10, { 
    before: "⚠️ ", 
    beforeColor: "#f59e0b" 
  })
  
  // Add diagnostic error
  lineNumberRef.current?.setLineSign(15, { 
    before: "❌ ", 
    beforeColor: "#dc2626" 
  })
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

## Diff Component

Unified or split diff viewer.

### Props

```typescript
interface DiffProps {
  // Content
  oldContent: string                // Original content
  newContent: string                // Modified content
  
  // Language
  filetype?: string                 // Language for syntax highlighting
  
  // View mode
  viewMode?: "unified" | "split"    // Diff view mode (default: unified)
  
  // Styling
  syntaxStyle?: SyntaxStyle         // Custom syntax highlighting
  
  // Layout
  style?: {
    // ... layout props
  }
}
```

### Example

```tsx
const oldCode = `
function greet(name) {
  console.log("Hello " + name)
}
`

const newCode = `
function greet(name: string): void {
  console.log(\`Hello, \${name}!\`)
}
`

<diff
  oldContent={oldCode}
  newContent={newCode}
  filetype="typescript"
  viewMode="unified"
  syntaxStyle={syntaxStyle}
/>
```

## ASCII Font Component

Display large ASCII art text.

### Props

```typescript
interface ASCIIFontProps {
  // Content
  text: string                      // Text to render
  
  // Font
  font?: "tiny" | "block" | "slick" | "shade"  // Font style (default: block)
  
  // Color
  color?: RGBA                      // Text color
  
  // Layout
  style?: {
    // ... layout props
  }
}
```

### Example

```tsx
import { RGBA } from "@opentui/core"

<ascii-font
  text="OPENTUI"
  font="block"
  color={RGBA.fromHex("#00FF00")}
/>
```

**Font Examples:**
- `tiny` - Small, compact font
- `block` - Large block letters
- `slick` - Stylized letters
- `shade` - Shaded/3D effect

## Component Styling

All components support two ways of applying styles:

### Direct Props

```tsx
<box
  backgroundColor="#1a1a1a"
  padding={2}
  flexDirection="column"
  width={60}
>
  <text>Content</text>
</box>
```

### Style Prop

```tsx
<box style={{
  backgroundColor: "#1a1a1a",
  padding: 2,
  flexDirection: "column",
  width: 60,
}}>
  <text>Content</text>
</box>
```

Both approaches are equivalent. Use whichever is more convenient.

### Props Excluded from Style

The following props cannot be passed via `style`:
- Component-specific props: `content`, `title`, `placeholder`, `options`, etc.
- React props: `key`, `ref`
- Event handlers: `onInput`, `onChange`, `onSubmit`
- Lifecycle props: `renderBefore`, `renderAfter`

## Ref Access

Many components support refs to access the underlying renderable:

```tsx
import { useRef } from "react"
import type { TextareaRenderable, LineNumberRenderable } from "@opentui/core"

const textareaRef = useRef<TextareaRenderable>(null)
const lineNumberRef = useRef<LineNumberRenderable>(null)

<textarea ref={textareaRef} />
<line-number ref={lineNumberRef}>
  <code />
</line-number>

// Access methods
textareaRef.current?.getText()
lineNumberRef.current?.setLineColor(1, "#00FF00")
```

## Custom Components

You can create custom components by extending base renderables:

```tsx
import {
  BoxRenderable,
  OptimizedBuffer,
  RGBA,
  type BoxOptions,
  type RenderContext,
} from "@opentui/core"
import { extend } from "@opentui/react"

class ButtonRenderable extends BoxRenderable {
  private _label: string = "Button"

  constructor(ctx: RenderContext, options: BoxOptions & { label?: string }) {
    super(ctx, { border: true, borderStyle: "single", ...options })
    if (options.label) this._label = options.label
  }

  protected renderSelf(buffer: OptimizedBuffer): void {
    super.renderSelf(buffer)
    // Custom rendering logic
    const centerX = this.x + Math.floor(this.width / 2 - this._label.length / 2)
    const centerY = this.y + Math.floor(this.height / 2)
    buffer.drawText(
      this._label,
      centerX,
      centerY,
      RGBA.fromInts(255, 255, 255, 255)
    )
  }

  set label(value: string) {
    this._label = value
    this.requestRender()
  }
}

// TypeScript augmentation
declare module "@opentui/react" {
  interface OpenTUIComponents {
    button: typeof ButtonRenderable
  }
}

// Register component
extend({ button: ButtonRenderable })

// Use in JSX
<button label="Click me!" style={{ width: 20, height: 3 }} />
```
