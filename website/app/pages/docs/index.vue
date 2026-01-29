<template>
  <div class="docs-page">
    <div class="container">
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <nav class="docs-nav">
            <h3>Documentation</h3>
            <ul>
              <li><NuxtLink to="/docs" :class="{ active: $route.path === '/docs' }">Overview</NuxtLink></li>
              <li><NuxtLink to="/docs/installation" :class="{ active: $route.path === '/docs/installation' }">Installation</NuxtLink></li>
              <li><NuxtLink to="/docs/usage" :class="{ active: $route.path === '/docs/usage' }">Usage</NuxtLink></li>
            </ul>
          </nav>
        </aside>
        
        <main class="docs-content">
          <h1 class="mb-lg">Documentation</h1>
          
          <section class="mb-2xl">
            <h2 id="overview">Overview</h2>
            <p>
              GitArbor TUI is a next-generation Git client built for developers who live in the terminal.
              It combines the power of modern web technologies (Bun, React, TypeScript) with the efficiency
              of terminal user interfaces to provide a fast, beautiful, and intuitive Git experience.
            </p>
          </section>
          
          <section class="mb-2xl">
            <h2 id="features">Key Features</h2>
            <ul class="feature-list">
              <li><strong>Lightning Fast:</strong> Built with Bun runtime for instant startup and blazing performance</li>
              <li><strong>Beautiful UI:</strong> Powered by OpenTUI and React for smooth, responsive interfaces</li>
              <li><strong>Keyboard-First:</strong> Vim-like keybindings for efficient navigation</li>
              <li><strong>Command Palette:</strong> Quick access to any feature with Ctrl+P</li>
              <li><strong>Multiple Themes:</strong> 10+ carefully crafted themes to match your style</li>
              <li><strong>Type-Safe:</strong> Written in TypeScript with strict mode enabled</li>
            </ul>
          </section>
          
          <section class="mb-2xl">
            <h2 id="quick-start">Quick Start</h2>
            <p>Get started with GitArbor in three simple steps:</p>
            
            <div class="steps">
              <div class="step card">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Install</h4>
                  <pre><code>bun install -g gitarbor</code></pre>
                </div>
              </div>
              
              <div class="step card">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Navigate to Repository</h4>
                  <pre><code>cd your-git-repo</code></pre>
                </div>
              </div>
              
              <div class="step card">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Launch GitArbor</h4>
                  <pre><code>gitarbor</code></pre>
                </div>
              </div>
            </div>
          </section>
          
          <section class="mb-2xl">
            <h2 id="requirements">Requirements</h2>
            <ul>
              <li><strong>Bun:</strong> v1.3.6 or higher</li>
              <li><strong>Git:</strong> v2.0 or higher</li>
              <li><strong>Terminal:</strong> Any modern terminal with Unicode support</li>
              <li><strong>OS:</strong> macOS, Linux, or Windows (WSL recommended)</li>
            </ul>
          </section>
          
          <section class="mb-2xl">
            <h2 id="next-steps">Next Steps</h2>
            <div class="next-steps-grid">
              <NuxtLink to="/docs/installation" class="next-step-card card">
                <h4>Installation Guide</h4>
                <p>Detailed installation instructions for all platforms</p>
              </NuxtLink>
              
              <NuxtLink to="/docs/usage" class="next-step-card card">
                <h4>Usage Guide</h4>
                <p>Learn keyboard shortcuts and workflow tips</p>
              </NuxtLink>
              
              <NuxtLink to="/themes" class="next-step-card card">
                <h4>Explore Themes</h4>
                <p>Browse and preview all available themes</p>
              </NuxtLink>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Documentation - GitArbor TUI',
  meta: [
    {
      name: 'description',
      content: 'Complete documentation for GitArbor TUI - installation, usage, features, and more.',
    },
  ],
})

useSeoMeta({
  title: 'Documentation - GitArbor TUI',
  ogTitle: 'Documentation - GitArbor TUI',
  description: 'Complete documentation for GitArbor TUI - installation, usage, features, and more.',
  ogDescription: 'Complete documentation for GitArbor TUI - installation, usage, features, and more.',
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

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
}

.feature-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.step {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.step-content {
  flex-grow: 1;
}

.step-content h4 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.step-content pre {
  margin-bottom: 0;
}

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.next-step-card {
  padding: var(--spacing-lg);
  transition: all 0.2s ease;
}

.next-step-card h4 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.next-step-card p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }
  
  .docs-sidebar {
    position: static;
    margin-bottom: var(--spacing-lg);
  }
  
  .next-steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
