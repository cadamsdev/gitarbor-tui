# Deployment Guide

This document explains how to deploy the GitArbor TUI marketing website to various hosting platforms.

## Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel provides zero-config deployment for Nuxt applications.

1. **Connect Repository**:
   ```bash
   # Install Vercel CLI
   bun add -g vercel
   
   # Deploy from website directory
   cd website
   vercel
   ```

2. **Or use GitHub Integration**:
   - Push to GitHub
   - Import repository on [vercel.com](https://vercel.com)
   - Vercel auto-detects Nuxt and configures everything

3. **Configuration**:
   - Root Directory: `website`
   - Build Command: `bun run build`
   - Output Directory: `.output`
   - Install Command: `bun install`

### Option 2: Netlify

1. **Deploy via CLI**:
   ```bash
   # Install Netlify CLI
   bun add -g netlify-cli
   
   # Build the site
   cd website
   bun run build
   
   # Deploy
   netlify deploy --prod --dir=.output/public
   ```

2. **Or use GitHub Integration**:
   - Connect repository on [netlify.com](https://netlify.com)
   - Set build settings:
     - Base directory: `website`
     - Build command: `bun run build`
     - Publish directory: `website/.output/public`

### Option 3: Cloudflare Pages

1. **Connect GitHub repo** at [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Build settings**:
   - Build command: `cd website && bun install && bun run build`
   - Output directory: `website/.output/public`
   - Root directory: `/`

### Option 4: Static Hosting (GitHub Pages, S3, etc.)

For pure static hosting without SSR:

```bash
cd website

# Generate static site
bun run generate

# Deploy the .output/public directory to:
# - GitHub Pages
# - AWS S3
# - Google Cloud Storage
# - Any static file hosting
```

#### GitHub Pages Example:

```bash
# Build static site
cd website
bun run generate

# Deploy to gh-pages branch
cd .output/public
git init
git add -A
git commit -m "Deploy"
git push -f git@github.com:cadamsdev/gitarbor-tui.git main:gh-pages
```

## Environment Variables

No environment variables are required for the basic deployment. Optional configurations:

```env
# If you want to customize the site URL
NUXT_PUBLIC_SITE_URL=https://gitarbor.dev
```

## Custom Domain

After deploying, configure your custom domain:

### For Vercel:
1. Go to Project Settings → Domains
2. Add `gitarbor.dev` and `www.gitarbor.dev`
3. Configure DNS:
   ```
   A Record:     @    → 76.76.21.21
   CNAME Record: www  → cname.vercel-dns.com
   ```

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
   ```
   A Record:     @    → Netlify IP (provided)
   CNAME Record: www  → your-site.netlify.app
   ```

### For Cloudflare Pages:
1. Go to Custom Domains
2. Add domain (auto-configures if domain is on Cloudflare)

## Performance Optimization

The site is already optimized with:
- ✅ Static page prerendering
- ✅ CSS minification
- ✅ JS code splitting
- ✅ Gzip compression
- ✅ Preloaded critical assets

### Additional Optimizations:

1. **Add images to `/public/`**:
   - Create `public/og-image.png` (1200x630px) for social media
   - Add app screenshots to `public/screenshots/`

2. **Enable CDN caching**:
   - Most platforms auto-configure this
   - Cache headers are set for static assets

3. **Monitor performance**:
   - Use [web.dev/measure](https://web.dev/measure)
   - Target: 90+ Lighthouse score

## SSL/HTTPS

All recommended platforms provide free SSL certificates automatically via Let's Encrypt.

## Continuous Deployment

Once connected to GitHub:
- Push to `main` → automatic deployment
- Pull requests → preview deployments
- No manual deployment needed

## Troubleshooting

### Build fails with "Cannot find module"
```bash
# Clean install
rm -rf node_modules bun.lockb
bun install
bun run build
```

### "Page not found" on routes
- For SSR: Ensure Nitro preset is correct
- For static: Run `bun run generate` instead of `build`

### CSS not loading
- Check that `.output/public/_nuxt/*.css` files exist
- Clear CDN cache if using one

## Recommended Stack

**Best Performance**: Vercel or Cloudflare Pages
- Native Nuxt support
- Global CDN
- Automatic SSL
- Preview deployments
- Zero configuration

## Build Info

- **Build time**: ~30-45 seconds
- **Output size**: ~2.5MB (615KB gzipped)
- **Generated files**: HTML + CSS + JS chunks
- **Prerendered pages**: 5 routes
