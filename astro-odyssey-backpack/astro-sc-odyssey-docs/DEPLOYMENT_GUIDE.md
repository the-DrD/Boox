# Astro Odyssey Theme - Deployment Guide

## 🚀 Production Deployment Guide

This guide covers deploying the Astro Odyssey Theme to various hosting platforms, with CI/CD setup, performance optimization, and production configuration.

## 📋 Pre-Deployment Checklist

### Essential Configuration
- [ ] Update `astro.config.mjs` with production site URL
- [ ] Configure environment variables for production
- [ ] Test all forms with production endpoints
- [ ] Verify all theme images are optimized
- [ ] Run production build locally and test
- [ ] Check all internal links and navigation
- [ ] Validate SEO meta tags and Open Graph data

### Performance Verification
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Test theme switching performance
- [ ] Verify image optimization and lazy loading
- [ ] Check CSS and JavaScript bundle sizes
- [ ] Test mobile responsiveness across devices

## 🌐 Platform-Specific Deployment

### Netlify Deployment

#### Quick Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Netlify Configuration
Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Form handling
[context.production]
  environment = { NODE_ENV = "production" }
```

#### Netlify Forms Integration
Update contact forms:

```astro
<!-- src/components/forms/ContactForm.astro -->
<form 
  name="contact"
  method="POST" 
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  action="/thank-you"
>
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  
  <!-- Your form fields -->
  <Input name="name" placeholder="Name" required />
  <Input type="email" name="email" placeholder="Email" required />
  <Textarea name="message" placeholder="Message" required />
  <Button type="submit">Send Message</Button>
</form>
```

### Vercel Deployment

#### Quick Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Vercel Configuration
Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

#### Environment Variables Setup
```bash
# Set environment variables
vercel env add SITE_URL production
vercel env add CONTACT_FORM_ENDPOINT production
vercel env add ANALYTICS_ID production
```

### GitHub Pages Deployment

#### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        env:
          SITE_URL: ${{ vars.SITE_URL }}
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

#### Astro Configuration for GitHub Pages
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/repository-name', // Only if using project pages
  
  // GitHub Pages optimization
  build: {
    assets: 'assets'
  }
});
```

### Cloudflare Pages Deployment

#### Direct Git Integration
1. Connect GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Set Node.js version: `18` (in environment variables)

#### Cloudflare Pages Configuration
Create `_headers` file in `public/`:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Create `_redirects` file in `public/`:

```
# Redirect old URLs
/old-blog/* /blog/:splat 301

# SPA fallback for client-side routing
/* /404.html 404
```

## ⚙️ Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
# Site Configuration
SITE_URL=https://yourdomain.com
NODE_ENV=production

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PLAUSIBLE_DOMAIN=yourdomain.com

# Forms
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
NEWSLETTER_ENDPOINT=https://your-newsletter-service.com/api

# Services
CDN_URL=https://cdn.yourdomain.com
IMAGE_OPTIMIZATION_SERVICE=https://images.yourdomain.com
```

### Astro Production Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: process.env.SITE_URL || 'https://yourdomain.com',
  
  // Production optimizations
  build: {
    inlineStylesheets: 'auto',
    assetsPrefix: process.env.CDN_URL,
    format: 'directory', // Clean URLs
  },
  
  // Compression
  compressHTML: isProduction,
  
  // Integrations
  integrations: [
    sitemap(),
    mdx(),
    lit(),
    icon()
  ],
  
  // Vite optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['lit'],
            'theme': ['./src/styles/theme.css']
          }
        }
      }
    },
    
    // Production optimizations
    ...(isProduction && {
      ssr: {
        noExternal: ['lit']
      }
    })
  }
});
```

## 🔧 Build Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for unused dependencies
npx depcheck

# Audit bundle composition
npx webpack-bundle-analyzer dist/client
```

### Performance Optimizations

#### Image Optimization
```astro
---
// src/components/OptimizedImage.astro
export interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  format?: 'webp' | 'avif' | 'jpeg';
}

const { 
  src, 
  alt, 
  width = 800, 
  height, 
  loading = 'lazy',
  format = 'webp'
} = Astro.props;

// Generate optimized image URLs
const optimizedSrc = `${src}?w=${width}&f=${format}&q=80`;
const fallbackSrc = `${src}?w=${width}&f=jpeg&q=80`;
---

<picture>
  <source srcset={optimizedSrc} type={`image/${format}`} />
  <img 
    src={fallbackSrc}
    {alt}
    {width}
    {height}
    {loading}
    decoding="async"
  />
</picture>
```

#### Critical CSS Extraction
```javascript
// scripts/extract-critical.js
import { PurgeCSS } from 'purgecss';
import fs from 'fs/promises';

const purgeCSSResults = await new PurgeCSS().purge({
  content: ['dist/**/*.html'],
  css: ['dist/assets/*.css'],
  safelist: [
    // Theme switching classes
    '[data-theme]',
    /theme-/,
    // Dynamic classes
    /active$/,
    /visible$/
  ]
});

// Write critical CSS
await fs.writeFile('dist/critical.css', purgeCSSResults[0].css);
```

## 📊 Performance Monitoring

### Core Web Vitals Setup

#### Performance Measurement
```typescript
// src/utils/performance.ts
export function measureWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Import web-vitals dynamically
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

// Track theme switching performance
export function measureThemeSwitch() {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`Theme switch took ${endTime - startTime} milliseconds`);
  };
}
```

#### Lighthouse CI Configuration
Create `.lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4321',
        'http://localhost:4321/blog',
        'http://localhost:4321/company/about'
      ],
      startServerCommand: 'npm run preview',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Real User Monitoring
```astro
---
// src/components/RUM.astro
const { analyticsId } = Astro.props;
---

{analyticsId && (
  <script define:vars={{ analyticsId }}>
    // Real User Monitoring
    window.addEventListener('load', () => {
      // Performance observer for navigation timing
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Page Load Time:', entry.loadEventEnd - entry.fetchStart);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
      
      // Long task monitoring
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', entry.duration);
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    });
  </script>
)}
```

## 🔐 Security & Headers

### Security Headers Configuration

#### Netlify Security Headers
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
```

#### Vercel Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

## 📈 Analytics Integration

### Google Analytics 4
```astro
---
// src/components/GoogleAnalytics.astro
export interface Props {
  id: string;
}

const { id } = Astro.props;
---

{id && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
    <script define:vars={{ id }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', id, {
        page_title: document.title,
        page_location: window.location.href
      });
      
      // Track theme changes
      document.addEventListener('theme-changed', (event) => {
        gtag('event', 'theme_change', {
          theme_name: event.detail.theme
        });
      });
    </script>
  </>
)}
```

### Plausible Analytics
```astro
---
// src/components/PlausibleAnalytics.astro
export interface Props {
  domain: string;
}

const { domain } = Astro.props;
---

{domain && (
  <script 
    defer 
    data-domain={domain}
    src="https://plausible.io/js/script.js"
  ></script>
)}
```

## 🚨 Monitoring & Alerts

### Uptime Monitoring Setup
```yaml
# .github/workflows/uptime-check.yml
name: Uptime Check
on:
  schedule:
    - cron: '*/15 * * * *' # Every 15 minutes
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check website
        run: |
          status=$(curl -s -o /dev/null -w "%{http_code}" ${{ vars.SITE_URL }})
          if [ $status -ne 200 ]; then
            echo "Website is down! Status: $status"
            exit 1
          fi
          echo "Website is up! Status: $status"
```

### Error Monitoring Integration
```typescript
// src/utils/error-tracking.ts
interface ErrorDetails {
  message: string;
  stack?: string;
  url: string;
  timestamp: number;
  userAgent: string;
  theme?: string;
}

export function initErrorTracking() {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('error', (event) => {
    const errorDetails: ErrorDetails = {
      message: event.message,
      stack: event.error?.stack,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      theme: document.documentElement.getAttribute('data-theme') || 'default'
    };
    
    // Send to your error tracking service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorDetails)
    }).catch(console.error);
  });
  
  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const errorDetails: ErrorDetails = {
      message: `Unhandled Promise Rejection: ${event.reason}`,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      theme: document.documentElement.getAttribute('data-theme') || 'default'
    };
    
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorDetails)
    }).catch(console.error);
  });
}
```

## 🔄 CI/CD Best Practices

### Automated Testing Pipeline
```yaml
# .github/workflows/test-and-deploy.yml
name: Test and Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run format
        
      - name: Build project
        run: npm run build
        
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
          
      - name: Check bundle size
        run: |
          npm run build
          du -sh dist/
          find dist/ -name "*.js" -exec ls -lh {} \;
          
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to production
        run: |
          # Your deployment script
          npm run build
          # Deploy to your hosting platform
```

### Environment-Specific Builds
```bash
#!/bin/bash
# scripts/deploy.sh

set -e

ENVIRONMENT=${1:-staging}

echo "Deploying to $ENVIRONMENT..."

# Set environment-specific variables
case $ENVIRONMENT in
  "production")
    export SITE_URL="https://yourdomain.com"
    export NODE_ENV="production"
    ;;
  "staging")
    export SITE_URL="https://staging.yourdomain.com"
    export NODE_ENV="staging"
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# Build
npm run build

# Deploy based on environment
case $ENVIRONMENT in
  "production")
    netlify deploy --prod --dir=dist
    ;;
  "staging")
    netlify deploy --dir=dist
    ;;
esac

echo "Deployment to $ENVIRONMENT completed!"
```

This deployment guide provides comprehensive coverage for moving the Astro Odyssey Theme from development to production across multiple hosting platforms, with performance optimization, security considerations, and monitoring setup.