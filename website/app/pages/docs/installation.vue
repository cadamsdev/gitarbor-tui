<template>
  <div class="docs-page">
    <div class="container">
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <nav class="docs-nav">
            <h3>Documentation</h3>
            <ul>
              <li><NuxtLink to="/docs">Overview</NuxtLink></li>
              <li><NuxtLink to="/docs/installation" class="active">Installation</NuxtLink></li>
              <li><NuxtLink to="/docs/usage">Usage</NuxtLink></li>
            </ul>
          </nav>
        </aside>
        
        <main class="docs-content">
          <h1 class="mb-lg">Installation</h1>
          
          <section class="mb-2xl">
            <h2 id="requirements">Requirements</h2>
            <p>Before installing GitArbor, ensure you have the following:</p>
            <ul>
              <li><strong>Bun:</strong> v1.3.6 or higher (<a href="https://bun.sh" target="_blank" rel="noopener">Install Bun</a>)</li>
              <li><strong>Git:</strong> v2.0 or higher</li>
              <li><strong>Terminal:</strong> Any modern terminal with Unicode support</li>
            </ul>
          </section>
          
          <section class="mb-2xl">
            <h2 id="install-bun">Install Bun</h2>
            <p>If you don't have Bun installed, install it first:</p>
            
            <h4 class="mt-lg mb-sm">macOS / Linux</h4>
            <pre><code>curl -fsSL https://bun.sh/install | bash</code></pre>
            
            <h4 class="mt-lg mb-sm">Windows (PowerShell)</h4>
            <pre><code>powershell -c "irm bun.sh/install.ps1 | iex"</code></pre>
            
            <p class="mt-md">
              After installation, restart your terminal and verify:
            </p>
            <pre><code>bun --version</code></pre>
          </section>
          
          <section class="mb-2xl">
            <h2 id="install-gitarbor">Install GitArbor</h2>
            
            <h4 class="mb-sm">Global Installation (Recommended)</h4>
            <pre><code>bun install -g gitarbor</code></pre>
            
            <h4 class="mt-lg mb-sm">Verify Installation</h4>
            <pre><code>gitarbor --version</code></pre>
            
            <div class="info-box mt-lg">
              <strong>Note:</strong> Global installation is currently in development. 
              For now, you can run GitArbor from source (see below).
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="run-from-source">Run from Source</h2>
            <p>To run GitArbor from source during development:</p>
            
            <h4 class="mt-md mb-sm">1. Clone the Repository</h4>
            <pre><code>git clone https://github.com/cadamsdev/gitarbor-tui.git
cd gitarbor-tui</code></pre>
            
            <h4 class="mt-lg mb-sm">2. Install Dependencies</h4>
            <pre><code>bun install</code></pre>
            
            <h4 class="mt-lg mb-sm">3. Run GitArbor</h4>
            <pre><code>bun run start</code></pre>
            
            <p class="mt-md">
              Or run directly:
            </p>
            <pre><code>bun run index.tsx</code></pre>
          </section>
          
          <section class="mb-2xl">
            <h2 id="troubleshooting">Troubleshooting</h2>
            
            <div class="troubleshooting-item">
              <h4>Command not found: gitarbor</h4>
              <p>
                Make sure Bun's global bin directory is in your PATH. 
                Add this to your shell config (~/.bashrc, ~/.zshrc, etc.):
              </p>
              <pre><code>export PATH="$HOME/.bun/bin:$PATH"</code></pre>
            </div>
            
            <div class="troubleshooting-item mt-lg">
              <h4>Terminal Display Issues</h4>
              <p>
                GitArbor requires a terminal with Unicode support. 
                We recommend using:
              </p>
              <ul>
                <li>iTerm2 or Terminal.app (macOS)</li>
                <li>Windows Terminal (Windows)</li>
                <li>Alacritty, Kitty, or GNOME Terminal (Linux)</li>
              </ul>
            </div>
            
            <div class="troubleshooting-item mt-lg">
              <h4>Bun Installation Issues</h4>
              <p>
                If you encounter issues installing Bun, refer to the 
                <a href="https://bun.sh/docs/installation" target="_blank" rel="noopener">official Bun installation guide</a>.
              </p>
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="next-steps">Next Steps</h2>
            <p>Now that GitArbor is installed, learn how to use it:</p>
            <NuxtLink to="/docs/usage" class="btn btn-primary mt-md">
              Usage Guide →
            </NuxtLink>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Installation Guide - GitArbor TUI',
  meta: [
    {
      name: 'description',
      content: 'Step-by-step installation guide for GitArbor TUI. Install Bun, set up GitArbor, and get started in minutes.',
    },
  ],
})

useSeoMeta({
  title: 'Installation Guide - GitArbor TUI',
  ogTitle: 'Installation Guide - GitArbor TUI',
  description: 'Step-by-step installation guide for GitArbor TUI. Install Bun, set up GitArbor, and get started in minutes.',
  ogDescription: 'Step-by-step installation guide for GitArbor TUI. Install Bun, set up GitArbor, and get started in minutes.',
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

.info-box {
  background: var(--color-bg-secondary);
  border-left: 4px solid var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
}

.troubleshooting-item h4 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
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
