#!/usr/bin/env bun
// @ts-nocheck
import { createCliRenderer } from '@opentui/core'
import { createRoot } from '@opentui/react'
import { App } from './src/App'

// Create the CLI renderer (async)
const renderer = await createCliRenderer({
  exitOnCtrlC: false, // We handle Ctrl+C in the app
  useAlternateScreen: true, // Enable fullscreen mode with alternate buffer
})

// Create and mount the React root
const cwd = process.cwd()
const root = createRoot(renderer)
root.render(<App cwd={cwd} />)

// Clean exit handler
const cleanExit = () => {
  root.unmount()
  renderer.destroy()
  process.exit(0)
}

// Handle cleanup on exit signals
process.on('SIGINT', cleanExit)
process.on('SIGTERM', cleanExit)

// Export cleanExit for use in App component
;(globalThis as any).__gitarborCleanExit = cleanExit
