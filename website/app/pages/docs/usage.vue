<template>
  <div class="docs-page">
    <div class="container">
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <nav class="docs-nav">
            <h3>Documentation</h3>
            <ul>
              <li><NuxtLink to="/docs">Overview</NuxtLink></li>
              <li><NuxtLink to="/docs/installation">Installation</NuxtLink></li>
              <li><NuxtLink to="/docs/usage" class="active">Usage</NuxtLink></li>
            </ul>
          </nav>
        </aside>
        
        <main class="docs-content">
          <h1 class="mb-lg">Usage Guide</h1>
          
          <section class="mb-2xl">
            <h2 id="getting-started">Getting Started</h2>
            <p>Navigate to any Git repository and launch GitArbor:</p>
            <pre><code>cd your-git-repo
gitarbor</code></pre>
            <p class="mt-md">
              GitArbor will automatically detect the repository and display the current status.
            </p>
          </section>
          
          <section class="mb-2xl">
            <h2 id="interface">Interface Overview</h2>
            <p>GitArbor's interface consists of several key areas:</p>
            
            <div class="interface-section">
              <h4>Header</h4>
              <p>Displays current branch, ahead/behind status, and active view.</p>
            </div>
            
            <div class="interface-section">
              <h4>Main View</h4>
              <p>Shows repository status, file changes, branches, and commit history.</p>
            </div>
            
            <div class="interface-section">
              <h4>Footer</h4>
              <p>Displays keybindings and status messages.</p>
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
            
            <h4 class="mt-lg mb-sm">Navigation</h4>
            <div class="keybindings">
              <div class="keybinding">
                <kbd>j</kbd> / <kbd>↓</kbd>
                <span>Move down</span>
              </div>
              <div class="keybinding">
                <kbd>k</kbd> / <kbd>↑</kbd>
                <span>Move up</span>
              </div>
              <div class="keybinding">
                <kbd>Tab</kbd>
                <span>Switch between panels</span>
              </div>
              <div class="keybinding">
                <kbd>1-3</kbd>
                <span>Switch to view (Status, Log, Branches)</span>
              </div>
            </div>
            
            <h4 class="mt-lg mb-sm">File Operations</h4>
            <div class="keybindings">
              <div class="keybinding">
                <kbd>Space</kbd>
                <span>Stage/unstage file</span>
              </div>
              <div class="keybinding">
                <kbd>Enter</kbd>
                <span>View file diff</span>
              </div>
              <div class="keybinding">
                <kbd>c</kbd>
                <span>Commit staged changes</span>
              </div>
              <div class="keybinding">
                <kbd>P</kbd>
                <span>Push to remote</span>
              </div>
              <div class="keybinding">
                <kbd>p</kbd>
                <span>Pull from remote</span>
              </div>
              <div class="keybinding">
                <kbd>F</kbd>
                <span>Fetch from remote</span>
              </div>
            </div>
            
            <h4 class="mt-lg mb-sm">Branch Operations</h4>
            <div class="keybindings">
              <div class="keybinding">
                <kbd>n</kbd>
                <span>Create new branch</span>
              </div>
              <div class="keybinding">
                <kbd>Space</kbd>
                <span>Checkout branch</span>
              </div>
              <div class="keybinding">
                <kbd>d</kbd>
                <span>Delete branch</span>
              </div>
              <div class="keybinding">
                <kbd>m</kbd>
                <span>Merge branch</span>
              </div>
            </div>
            
            <h4 class="mt-lg mb-sm">General</h4>
            <div class="keybindings">
              <div class="keybinding">
                <kbd>Ctrl+P</kbd>
                <span>Open command palette</span>
              </div>
              <div class="keybinding">
                <kbd>,</kbd>
                <span>Open settings</span>
              </div>
              <div class="keybinding">
                <kbd>r</kbd>
                <span>Refresh</span>
              </div>
              <div class="keybinding">
                <kbd>?</kbd>
                <span>Show help</span>
              </div>
              <div class="keybinding">
                <kbd>q</kbd>
                <span>Quit</span>
              </div>
              <div class="keybinding">
                <kbd>Esc</kbd>
                <span>Close modal/go back</span>
              </div>
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="workflows">Common Workflows</h2>
            
            <div class="workflow">
              <h4>Making a Commit</h4>
              <ol>
                <li>Navigate to changed files in Status view (<kbd>1</kbd>)</li>
                <li>Stage files with <kbd>Space</kbd></li>
                <li>Press <kbd>c</kbd> to open commit modal</li>
                <li>Type commit message and press <kbd>Ctrl+Enter</kbd></li>
              </ol>
            </div>
            
            <div class="workflow mt-lg">
              <h4>Creating and Switching Branches</h4>
              <ol>
                <li>Go to Branches view (<kbd>3</kbd>)</li>
                <li>Press <kbd>n</kbd> to create a new branch</li>
                <li>Enter branch name and press <kbd>Enter</kbd></li>
                <li>Navigate to any branch and press <kbd>Space</kbd> to checkout</li>
              </ol>
            </div>
            
            <div class="workflow mt-lg">
              <h4>Viewing Commit History</h4>
              <ol>
                <li>Switch to Log view (<kbd>2</kbd>)</li>
                <li>Navigate commits with <kbd>j</kbd>/<kbd>k</kbd></li>
                <li>Press <kbd>Enter</kbd> to view commit details</li>
              </ol>
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="command-palette">Command Palette</h2>
            <p>
              Press <kbd>Ctrl+P</kbd> to open the command palette for quick access to any feature:
            </p>
            <ul>
              <li>Search and execute any command</li>
              <li>Navigate to different views</li>
              <li>Change themes</li>
              <li>Access settings</li>
            </ul>
          </section>
          
          <section class="mb-2xl">
            <h2 id="themes">Themes</h2>
            <p>
              GitArbor includes 10+ beautiful themes. Change themes via:
            </p>
            <ul>
              <li>Command palette (<kbd>Ctrl+P</kbd>) → "Change Theme"</li>
              <li>Settings (<kbd>,</kbd>) → Theme section</li>
            </ul>
            <p class="mt-md">
              <NuxtLink to="/themes">View all available themes →</NuxtLink>
            </p>
          </section>
          
          <section class="mb-2xl">
            <h2 id="tips">Tips & Tricks</h2>
            
            <div class="tip">
              <strong>💡 Tip:</strong> Use <kbd>?</kbd> anytime to see contextual help and available keybindings.
            </div>
            
            <div class="tip mt-md">
              <strong>💡 Tip:</strong> GitArbor automatically refreshes when you switch back to the terminal.
            </div>
            
            <div class="tip mt-md">
              <strong>💡 Tip:</strong> Customize keybindings and behavior in Settings (<kbd>,</kbd>).
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Usage Guide - GitArbor TUI',
  meta: [
    {
      name: 'description',
      content: 'Complete usage guide for GitArbor TUI. Learn keyboard shortcuts, workflows, and tips for efficient Git operations.',
    },
  ],
})

useSeoMeta({
  title: 'Usage Guide - GitArbor TUI',
  ogTitle: 'Usage Guide - GitArbor TUI',
  description: 'Complete usage guide for GitArbor TUI. Learn keyboard shortcuts, workflows, and tips for efficient Git operations.',
  ogDescription: 'Complete usage guide for GitArbor TUI. Learn keyboard shortcuts, workflows, and tips for efficient Git operations.',
})
</script>

<style scoped>
.docs-page {
  padding: var(--spacing-2xl) 0;
}

.docs-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--spacing-2xl);
}

.docs-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.docs-nav h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-size: 1.125rem;
}

.docs-nav ul {
  list-style: none;
  padding: 0;
}

.docs-nav li {
  margin-bottom: var(--spacing-xs);
}

.docs-nav a {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-secondary);
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.docs-nav a:hover,
.docs-nav a.active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  background: var(--color-bg-secondary);
}

.docs-content {
  max-width: 800px;
}

.docs-content h2 {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.docs-content h4 {
  color: var(--color-text-primary);
  font-size: 1.125rem;
}

.interface-section {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--color-primary);
}

.interface-section h4 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.interface-section p {
  margin: 0;
}

.keybindings {
  display: grid;
  gap: var(--spacing-sm);
}

.keybinding {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
}

.keybinding span {
  color: var(--color-text-secondary);
}

kbd {
  font-family: var(--font-mono);
  background: var(--color-bg-highlight);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.125rem 0.5rem;
  font-size: 0.9em;
  color: var(--color-primary);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);
}

.workflow {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.workflow h4 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.workflow ol {
  margin: 0;
  padding-left: var(--spacing-lg);
}

.workflow li {
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
}

.tip {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--color-primary);
}

@media (max-width: 768px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }
  
  .docs-sidebar {
    position: static;
    margin-bottom: var(--spacing-lg);
  }
}
</style>
