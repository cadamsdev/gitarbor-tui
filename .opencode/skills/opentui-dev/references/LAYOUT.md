# OpenTUI Layout Guide

Comprehensive guide to OpenTUI's Yoga-based Flexbox layout system.

## Overview

OpenTUI uses the Yoga layout engine, which provides a CSS Flexbox-like layout system for terminal UIs. If you're familiar with CSS Flexbox, you'll feel right at home.

## Core Concepts

### Container and Items

- **Container**: A box with `flexDirection`, `justifyContent`, `alignItems`, etc.
- **Items**: Children of the container that respond to flex properties

```tsx
<box flexDirection="row" justifyContent="center">
  {/* These are flex items */}
  <box flexGrow={1}>Item 1</box>
  <box flexGrow={2}>Item 2</box>
</box>
```

### Main Axis and Cross Axis

- **Main Axis**: Direction of `flexDirection` (row = horizontal, column = vertical)
- **Cross Axis**: Perpendicular to main axis

```tsx
// Main axis: horizontal (left to right)
// Cross axis: vertical (top to bottom)
<box flexDirection="row">
  <box>A</box>
  <box>B</box>
</box>

// Main axis: vertical (top to bottom)
// Cross axis: horizontal (left to right)
<box flexDirection="column">
  <box>A</box>
  <box>B</box>
</box>
```

## Flex Direction

Controls the direction of the main axis.

```tsx
flexDirection: "row" | "column" | "row-reverse" | "column-reverse"
```

### Examples

```tsx
// Horizontal layout (default)
<box flexDirection="row">
  <box>A</box>
  <box>B</box>
  <box>C</box>
</box>
// Result: [A][B][C]

// Vertical layout
<box flexDirection="column">
  <box>A</box>
  <box>B</box>
  <box>C</box>
</box>
// Result:
// [A]
// [B]
// [C]

// Horizontal reversed
<box flexDirection="row-reverse">
  <box>A</box>
  <box>B</box>
  <box>C</box>
</box>
// Result: [C][B][A]

// Vertical reversed
<box flexDirection="column-reverse">
  <box>A</box>
  <box>B</box>
  <box>C</box>
</box>
// Result:
// [C]
// [B]
// [A]
```

## Justify Content

Controls alignment along the **main axis**.

```tsx
justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
```

### Examples (flexDirection="row")

```tsx
// Start (default)
<box flexDirection="row" justifyContent="flex-start" width={20}>
  <box width={3}>A</box>
  <box width={3}>B</box>
</box>
// Result: [A][B]          (items at start)

// End
<box flexDirection="row" justifyContent="flex-end" width={20}>
  <box width={3}>A</box>
  <box width={3}>B</box>
</box>
// Result:           [A][B] (items at end)

// Center
<box flexDirection="row" justifyContent="center" width={20}>
  <box width={3}>A</box>
  <box width={3}>B</box>
</box>
// Result:      [A][B]      (items centered)

// Space Between
<box flexDirection="row" justifyContent="space-between" width={20}>
  <box width={3}>A</box>
  <box width={3}>B</box>
</box>
// Result: [A]          [B] (max space between)

// Space Around
<box flexDirection="row" justifyContent="space-around" width={20}>
  <box width={3}>A</box>
  <box width={3}>B</box>
</box>
// Result:   [A]      [B]   (equal space around each)
```

## Align Items

Controls alignment along the **cross axis**.

```tsx
alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
```

### Examples (flexDirection="row")

```tsx
// Start (default)
<box flexDirection="row" alignItems="flex-start" height={10}>
  <box width={5} height={3}>A</box>
  <box width={5} height={5}>B</box>
</box>
// Result:
// [A][B]
// [A][B]
// [A][B]
//    [B]
//    [B]

// End
<box flexDirection="row" alignItems="flex-end" height={10}>
  <box width={5} height={3}>A</box>
  <box width={5} height={5}>B</box>
</box>
// Result:
//    [B]
//    [B]
// [A][B]
// [A][B]
// [A][B]

// Center
<box flexDirection="row" alignItems="center" height={10}>
  <box width={5} height={3}>A</box>
  <box width={5} height={5}>B</box>
</box>
// Result:
//    [B]
// [A][B]
// [A][B]
// [A][B]
//    [B]

// Stretch (items fill cross axis)
<box flexDirection="row" alignItems="stretch" height={10}>
  <box width={5}>A</box>
  <box width={5}>B</box>
</box>
// Result: Both A and B stretch to height: 10
```

## Align Self

Override `alignItems` for a specific item.

```tsx
alignSelf: "flex-start" | "flex-end" | "center" | "stretch" | "baseline" | "auto"
```

### Example

```tsx
<box flexDirection="row" alignItems="flex-start" height={10}>
  <box width={5} height={3}>A</box>
  <box width={5} height={3} alignSelf="flex-end">B</box>
  <box width={5} height={3} alignSelf="center">C</box>
</box>
// A at top, B at bottom, C centered
```

## Flex Grow, Shrink, and Basis

Control how items grow and shrink to fill available space.

### Flex Grow

How much an item should grow relative to siblings.

```tsx
flexGrow: number  // Default: 0
```

```tsx
<box flexDirection="row" width={60}>
  <box flexGrow={1} style={{ backgroundColor: "#FF0000" }}>
    <text>Grows 1x</text>
  </box>
  <box flexGrow={2} style={{ backgroundColor: "#00FF00" }}>
    <text>Grows 2x</text>
  </box>
  <box flexGrow={1} style={{ backgroundColor: "#0000FF" }}>
    <text>Grows 1x</text>
  </box>
</box>
// Result: Item 2 is twice as wide as items 1 and 3
// Widths: 15, 30, 15 (total 60)
```

### Flex Shrink

How much an item should shrink relative to siblings when space is limited.

```tsx
flexShrink: number  // Default: 1
```

```tsx
<box flexDirection="row" width={30}>
  <box width={20} flexShrink={1}>A</box>
  <box width={20} flexShrink={2}>B</box>
</box>
// Total width needed: 40, available: 30
// Need to shrink: 10
// B shrinks 2x more than A
// Result: A=16, B=14 (or similar ratio)
```

### Flex Basis

Initial size before growing/shrinking.

```tsx
flexBasis: number | "auto" | `${number}%`  // Default: "auto"
```

```tsx
<box flexDirection="row" width={100}>
  <box flexBasis={30} flexGrow={1}>A</box>
  <box flexBasis={20} flexGrow={1}>B</box>
  <box flexBasis={10} flexGrow={1}>C</box>
</box>
// Start with bases: A=30, B=20, C=10 (total 60)
// Remaining space: 40
// Distribute equally: A+=13.33, B+=13.33, C+=13.33
// Final: A≈43, B≈33, C≈23
```

## Flex Wrap

Control whether items wrap to new lines.

```tsx
flexWrap: "no-wrap" | "wrap" | "wrap-reverse"  // Default: "no-wrap"
```

### Examples

```tsx
// No wrap (default) - items overflow or shrink
<box flexDirection="row" flexWrap="no-wrap" width={20}>
  <box width={10}>A</box>
  <box width={10}>B</box>
  <box width={10}>C</box>
</box>
// Result: All on one line, may overflow

// Wrap - items wrap to new lines
<box flexDirection="row" flexWrap="wrap" width={20}>
  <box width={10}>A</box>
  <box width={10}>B</box>
  <box width={10}>C</box>
</box>
// Result:
// [A][B]
// [C]

// Wrap reverse - wrap in reverse order
<box flexDirection="row" flexWrap="wrap-reverse" width={20}>
  <box width={10}>A</box>
  <box width={10}>B</box>
  <box width={10}>C</box>
</box>
// Result:
// [C]
// [A][B]
```

## Gap

Space between flex items.

```tsx
gap: number | `${number}%`          // Both row and column gap
rowGap: number | `${number}%`       // Gap between rows
columnGap: number | `${number}%`    // Gap between columns
```

### Examples

```tsx
// Uniform gap
<box flexDirection="row" gap={2}>
  <box width={10}>A</box>
  <box width={10}>B</box>
  <box width={10}>C</box>
</box>
// Result: [A]  [B]  [C] (2 chars between each)

// Row and column gaps (with wrap)
<box flexDirection="row" flexWrap="wrap" rowGap={1} columnGap={2} width={25}>
  <box width={10}>A</box>
  <box width={10}>B</box>
  <box width={10}>C</box>
</box>
// Result:
// [A]  [B]
//
// [C]
```

## Size Properties

### Width and Height

```tsx
width: number | "auto" | `${number}%`
height: number | "auto" | `${number}%`
```

```tsx
// Fixed size
<box width={40} height={10}>
  <text>Fixed size</text>
</box>

// Percentage (of parent)
<box width="50%" height="100%">
  <text>Half width, full height</text>
</box>

// Auto (fit content)
<box width="auto" height="auto">
  <text>Fits content</text>
</box>
```

### Min/Max Size

```tsx
minWidth: number | "auto" | `${number}%`
minHeight: number | "auto" | `${number}%`
maxWidth: number | "auto" | `${number}%`
maxHeight: number | "auto" | `${number}%`
```

```tsx
<box
  minWidth={20}
  maxWidth={80}
  minHeight={5}
  maxHeight={30}
  flexGrow={1}
>
  <text>Constrained size</text>
</box>
```

## Spacing

### Padding

Inner spacing (inside borders).

```tsx
padding: number | `${number}%`
paddingTop: number | `${number}%`
paddingRight: number | `${number}%`
paddingBottom: number | `${number}%`
paddingLeft: number | `${number}%`
```

```tsx
// Uniform padding
<box padding={2}>
  <text>Content</text>
</box>

// Individual sides
<box paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}>
  <text>Content</text>
</box>
```

### Margin

Outer spacing (outside borders).

```tsx
margin: number | "auto" | `${number}%`
marginTop: number | "auto" | `${number}%`
marginRight: number | "auto" | `${number}%`
marginBottom: number | "auto" | `${number}%`
marginLeft: number | "auto" | `${number}%`
```

```tsx
// Uniform margin
<box margin={2}>
  <text>Content</text>
</box>

// Auto margin (centering)
<box width={40} marginLeft="auto" marginRight="auto">
  <text>Centered horizontally</text>
</box>
```

## Position

### Relative (default)

Positioned in flow, can be offset with top/left/bottom/right.

```tsx
position: "relative"  // Default
```

```tsx
<box position="relative" top={2} left={5}>
  <text>Offset from normal position</text>
</box>
```

### Absolute

Positioned relative to parent, removed from flow.

```tsx
position: "absolute"
```

```tsx
<box position="relative" width={60} height={20}>
  {/* Normal flow content */}
  <text>Main content</text>
  
  {/* Positioned absolutely */}
  <box position="absolute" top={2} right={2}>
    <text>Top right corner</text>
  </box>
  
  <box position="absolute" bottom={0} left={0}>
    <text>Bottom left corner</text>
  </box>
</box>
```

### Z-Index

Stack order for overlapping elements (higher = on top).

```tsx
zIndex: number  // Default: 0
```

```tsx
<box position="relative" width={60} height={20}>
  <box position="absolute" top={5} left={5} zIndex={1} backgroundColor="#FF0000">
    <text>Behind</text>
  </box>
  <box position="absolute" top={7} left={7} zIndex={2} backgroundColor="#00FF00">
    <text>In front</text>
  </box>
</box>
```

## Overflow

Control what happens when content exceeds container size.

```tsx
overflow: "visible" | "hidden" | "scroll"  // Default: "visible"
```

```tsx
// Visible (default) - content may overflow
<box width={20} height={5} overflow="visible">
  <text>Very long text that exceeds the box width</text>
</box>

// Hidden - clip overflowing content
<box width={20} height={5} overflow="hidden">
  <text>Very long text that exceeds the box width</text>
</box>

// Scroll - enable scrolling (use <scrollbox> instead)
<box width={20} height={5} overflow="scroll">
  <text>Very long text that exceeds the box width</text>
</box>
```

## Visibility and Opacity

### Visible

Show or hide element (but still takes space).

```tsx
visible: boolean  // Default: true
```

```tsx
const [show, setShow] = useState(true)

<box visible={show}>
  <text>Conditionally visible</text>
</box>
```

### Opacity

Transparency level.

```tsx
opacity: number  // 0.0 (transparent) to 1.0 (opaque), default: 1.0
```

```tsx
<box opacity={0.5} backgroundColor="#FFFFFF">
  <text>Semi-transparent box</text>
</box>
```

## Common Layouts

### Horizontal Navigation Bar

```tsx
<box flexDirection="row" width="100%" height={3} gap={2}>
  <text>Home</text>
  <text>Files</text>
  <text>Settings</text>
  <text>Help</text>
</box>
```

### Sidebar with Main Content

```tsx
<box flexDirection="row" width="100%" height="100%">
  <box width={30} style={{ borderStyle: "single", border: true }}>
    <text>Sidebar</text>
  </box>
  <box flexGrow={1}>
    <text>Main Content</text>
  </box>
</box>
```

### Header, Content, Footer

```tsx
<box flexDirection="column" width="100%" height="100%">
  <box height={3} style={{ borderBottom: true }}>
    <text>Header</text>
  </box>
  <box flexGrow={1}>
    <text>Content</text>
  </box>
  <box height={3} style={{ borderTop: true }}>
    <text>Footer</text>
  </box>
</box>
```

### Centered Modal

```tsx
<box
  position="absolute"
  width={60}
  height={20}
  top="50%"
  left="50%"
  style={{
    marginTop: -10,     // Half of height
    marginLeft: -30,    // Half of width
    backgroundColor: "#1a1a1a",
    border: true,
  }}
>
  <text>Centered Modal</text>
</box>
```

### Grid Layout (using wrap)

```tsx
<box flexDirection="row" flexWrap="wrap" width={60} gap={2}>
  <box width={18} height={5} border>Item 1</box>
  <box width={18} height={5} border>Item 2</box>
  <box width={18} height={5} border>Item 3</box>
  <box width={18} height={5} border>Item 4</box>
  <box width={18} height={5} border>Item 5</box>
  <box width={18} height={5} border>Item 6</box>
</box>
```

### Responsive Layout

```tsx
import { useTerminalDimensions } from "@opentui/react"

function ResponsiveLayout() {
  const { width } = useTerminalDimensions()
  const isNarrow = width < 80

  return (
    <box flexDirection={isNarrow ? "column" : "row"} width={width}>
      <box flexGrow={1}>
        <text>Panel 1</text>
      </box>
      <box flexGrow={1}>
        <text>Panel 2</text>
      </box>
    </box>
  )
}
```

## Tips and Best Practices

### 1. Use Percentage Heights Carefully

Unlike web, terminal dimensions are fixed. Use `flexGrow` for dynamic sizing.

```tsx
// Good
<box flexGrow={1}>Content</box>

// Also good for specific ratios
<box height="50%">Half height</box>
```

### 2. Flexbox for Responsive Layouts

Use `flexGrow`, `flexShrink`, and `flexBasis` for responsive sizing.

```tsx
<box flexDirection="row">
  <box flexGrow={1}>Grows to fill</box>
  <box width={20}>Fixed 20 chars</box>
</box>
```

### 3. Centering Items

Combine `justifyContent` and `alignItems` for perfect centering.

```tsx
<box
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  width={60}
  height={20}
>
  <text>Perfectly centered</text>
</box>
```

### 4. Absolute Positioning for Overlays

Use `position="absolute"` for modals, tooltips, and overlays.

```tsx
<box position="relative" width="100%" height="100%">
  <MainContent />
  {showModal && (
    <box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal />
    </box>
  )}
</box>
```

### 5. Use Gap Instead of Margins

Gap is cleaner for spacing between items.

```tsx
// Good
<box flexDirection="row" gap={2}>
  <box>A</box>
  <box>B</box>
</box>

// Less clean
<box flexDirection="row">
  <box marginRight={2}>A</box>
  <box>B</box>
</box>
```

### 6. Debugging Layouts

Add borders and background colors to visualize layout.

```tsx
<box
  border
  borderColor="#FF0000"
  backgroundColor="#330000"
>
  <text>Debug this box</text>
</box>
```

## Differences from CSS Flexbox

### 1. No Float or Clear

OpenTUI doesn't support CSS float or clear properties.

### 2. Integer Dimensions

Terminal dimensions are integers (characters/lines), not pixels.

### 3. Limited Font Sizing

No font size control - terminal font is fixed.

### 4. No Transforms

No CSS transforms (rotate, scale, etc.).

### 5. Different Units

- **Characters/Lines**: width={40} = 40 characters
- **Percentage**: width="50%" = half of parent
- **No px, em, rem**: Terminal units only

## Troubleshooting

### Items Not Growing

Ensure parent has explicit size and items have `flexGrow > 0`.

```tsx
// Parent needs height
<box flexDirection="column" height={20}>
  <box flexGrow={1}>Now grows</box>
</box>
```

### Items Overflowing

Check parent size and item sizes. Use `flexWrap="wrap"` or `overflow="hidden"`.

```tsx
<box width={40} overflow="hidden">
  <text>Won't overflow</text>
</box>
```

### Centering Not Working

Ensure container has explicit dimensions.

```tsx
// Need explicit size to center
<box
  width={60}
  height={20}
  justifyContent="center"
  alignItems="center"
>
  <text>Centered</text>
</box>
```

### Layout Jank on Resize

Use `useTerminalDimensions()` for responsive layouts.

```tsx
const { width, height } = useTerminalDimensions()

<box width={width} height={height}>
  {/* Layout */}
</box>
```
