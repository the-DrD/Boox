# Astro Odyssey Theme - Troubleshooting Guide

## 🔧 Common Issues & Solutions

This guide covers the most frequently encountered issues when developing with the Astro Odyssey Theme, along with their solutions and debugging strategies.

## 🚨 Build & Development Issues

### Issue: Build Fails with "Module not found" Error

**Symptoms:**
```bash
Error: Could not resolve "./config/settings" from "src/components/core/Header.astro"
✘ [ERROR] Could not resolve "@config/settings"
```

**Solutions:**

1. **Check TypeScript Path Mapping**
   ```json
   // tsconfig.json - Verify these paths exist
   {
     "compilerOptions": {
       "baseUrl": "src",
       "paths": {
         "@config": ["config/*"],
         "@components/*": ["components/*"]
       }
     }
   }
   ```

2. **Verify File Extensions**
   ```astro
   // ❌ Wrong - missing .js extension
   import settings from '@config/settings';
   
   // ✅ Correct - include .js extension
   import settings from '@config/settings.js';
   ```

3. **Check File Existence**
   ```bash
   # Verify the file exists
   ls -la src/config/settings.js
   
   # Check for typos in filename
   find src/ -name "*setting*" -type f
   ```

### Issue: Development Server Won't Start

**Symptoms:**
```bash
Error: Cannot start dev server
Port 4321 is already in use
```

**Solutions:**

1. **Kill Existing Process**
   ```bash
   # Find process using port 4321
   lsof -ti:4321
   
   # Kill the process
   kill -9 $(lsof -ti:4321)
   
   # Or use different port
   npm run dev -- --port 3000
   ```

2. **Clear Node Modules and Reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **Check Node Version**
   ```bash
   # Verify Node.js version (requires 18+)
   node --version
   
   # If using nvm, switch to correct version
   nvm use 18
   ```

### Issue: Hot Reload Not Working

**Symptoms:**
- Changes to files don't trigger page refresh
- CSS changes don't update automatically

**Solutions:**

1. **Check File Watchers**
   ```bash
   # Increase file watcher limit (Linux/macOS)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C) and restart
   npm run dev
   ```

3. **Check for Syntax Errors**
   ```astro
   <!-- Check for unclosed tags or invalid syntax -->
   <!-- Astro is sensitive to syntax errors -->
   ```

## 🎨 Theme & Styling Issues

### Issue: Theme Switching Not Working

**Symptoms:**
- Theme switcher buttons appear but don't change theme
- Console error: "Cannot read property 'setAttribute' of null"

**Solutions:**

1. **Check Theme Switcher Import**
   ```astro
   ---
   // Make sure theme-switcher is properly imported
   import '@components/theme-switcher/theme-switcher.ts';
   ---
   
   <!-- Ensure the custom element is registered -->
   <theme-switcher></theme-switcher>
   ```

2. **Verify Lit Integration**
   ```javascript
   // astro.config.mjs - Ensure lit is installed
   import { defineConfig } from 'astro/config';
   import lit from '@astrojs/lit';
   
   export default defineConfig({
     integrations: [lit()]
   });
   ```

3. **Check Browser Compatibility**
   ```javascript
   // Add polyfill for older browsers
   if (!window.customElements) {
     console.error('Custom elements not supported');
   }
   ```

4. **Debug Theme Persistence**
   ```javascript
   // Check localStorage in browser dev tools
   localStorage.getItem('theme'); // Should return current theme
   
   // Check data-theme attribute
   document.documentElement.getAttribute('data-theme');
   ```

### Issue: CSS Variables Not Applying

**Symptoms:**
- Custom theme colors not showing
- Components not using theme variables

**Solutions:**

1. **Check CSS Variable Syntax**
   ```css
   /* ❌ Wrong - missing var() function */
   .component {
     background: --theme-primary;
   }
   
   /* ✅ Correct - using var() function */
   .component {
     background: var(--theme-primary);
   }
   ```

2. **Verify Theme CSS Import**
   ```astro
   ---
   // src/layouts/Base.astro
   import '@styles/index.css'; // This should import theme.css
   ---
   ```

3. **Check CSS Specificity**
   ```css
   /* More specific selectors override theme variables */
   [data-theme='dark'] .component {
     --theme-primary: #custom-color;
   }
   ```

4. **Debug CSS Variable Values**
   ```javascript
   // Check computed values in browser console
   const styles = getComputedStyle(document.documentElement);
   console.log(styles.getPropertyValue('--theme-primary'));
   ```

### Issue: Images Not Switching with Themes

**Symptoms:**
- Hero images don't change when switching themes
- Console error about missing image files

**Solutions:**

1. **Verify Image Files Exist**
   ```bash
   # Check that all theme images exist
   ls -la public/assets/images/home/
   # Should show: classic-hero.jpg, dark-hero.jpg, earth-hero.jpg, etc.
   ```

2. **Check Image Paths in Theme Switcher**
   ```typescript
   // src/components/theme-switcher/theme-switcher.ts
   private _setTheme(theme: string) {
     const _heroImage = document.querySelector('#home-hero-image') as HTMLImageElement;
     
     if (!_heroImage) {
       console.warn('Hero image element not found');
       return;
     }
     
     // Verify image paths are correct
     if (theme === 'dark') {
       _heroImage.src = '/assets/images/home/dark-hero.jpg';
     }
   }
   ```

3. **Add Image Preloading**
   ```astro
   ---
   // src/layouts/Base.astro
   ---
   <head>
     <!-- Preload critical theme images -->
     <link rel="preload" as="image" href="/assets/images/home/dark-hero.jpg">
     <link rel="preload" as="image" href="/assets/images/home/earth-hero.jpg">
   </head>
   ```

## 📝 Form & Content Issues

### Issue: Contact Forms Not Submitting

**Symptoms:**
- Form submission redirects to 404 page
- Form data not being received

**Solutions:**

1. **Check Form Action Attribute**
   ```astro
   <!-- For Netlify -->
   <form name="contact" method="POST" data-netlify="true" action="/thank-you">
     <input type="hidden" name="form-name" value="contact" />
     <!-- form fields -->
   </form>
   
   <!-- For external services -->
   <form action="https://formspree.io/f/your-form-id" method="POST">
     <!-- form fields -->
   </form>
   ```

2. **Verify Hidden Fields**
   ```astro
   <!-- Required for Netlify forms -->
   <input type="hidden" name="form-name" value="contact" />
   
   <!-- Honeypot for spam protection -->
   <p hidden>
     <label>Don't fill this out: <input name="bot-field" /></label>
   </p>
   ```

3. **Test Form Locally**
   ```bash
   # Build and serve locally to test forms
   npm run build
   npm run preview
   # Test form submission at localhost:4321
   ```

4. **Check Network Tab**
   ```
   Open browser dev tools → Network tab → Submit form
   Look for:
   - 200 status code for successful submission
   - 404 errors indicating wrong action URL
   - CORS errors for external services
   ```

### Issue: MDX Blog Posts Not Rendering

**Symptoms:**
- Blog posts show as blank pages
- Console errors about MDX compilation

**Solutions:**

1. **Check MDX Frontmatter Format**
   ```mdx
   ---
   # ✅ Correct frontmatter format
   layout: '../../../layouts/Post.astro'
   title: 'Post Title'
   publishDate: '2024-01-15'
   tags: ['astro', 'blog']
   ---
   
   # Post content here
   ```

2. **Verify Layout Path**
   ```mdx
   ---
   # Check relative path is correct from post location
   # src/pages/blog/posts/my-post.mdx
   layout: '../../../layouts/Post.astro' # Goes up 3 levels
   ---
   ```

3. **Check MDX Integration**
   ```javascript
   // astro.config.mjs
   import { defineConfig } from 'astro/config';
   import mdx from '@astrojs/mdx';
   
   export default defineConfig({
     integrations: [mdx()]
   });
   ```

4. **Validate Component Imports in MDX**
   ```mdx
   ---
   layout: '../../../layouts/Post.astro'
   ---
   
   import { YouTubeEmbed } from '@components/odyssey-theme';
   import Button from '@components/buttons/Button.astro';
   
   # Post Title
   
   <YouTubeEmbed url="..." />
   <Button href="/contact">Get Started</Button>
   ```

## 🔍 Icon & Asset Issues

### Issue: Icons Not Displaying

**Symptoms:**
- Icons appear as broken or empty elements
- Console errors about icon loading

**Solutions:**

1. **Check Icon Name Format**
   ```astro
   <!-- ❌ Wrong - incorrect icon name -->
   <Icon name="check" />
   
   <!-- ✅ Correct - full icon name -->
   <Icon name="mdi:check-circle" />
   <Icon name="ic:baseline-home" />
   ```

2. **Verify Icon Packages**
   ```bash
   # Check if icon packages are installed
   npm list @iconify-json/mdi @iconify-json/ic
   
   # Install missing packages
   npm install @iconify-json/mdi @iconify-json/ic
   ```

3. **Check Icon Import**
   ```astro
   ---
   // Correct import from astro-icon
   import { Icon } from 'astro-icon/components';
   ---
   
   <Icon name="mdi:heart" />
   ```

4. **Debug Icon Loading**
   ```astro
   <!-- Add fallback content -->
   <Icon name="mdi:check-circle">
     ✓ <!-- Fallback if icon fails -->
   </Icon>
   ```

### Issue: Images Not Loading or Optimizing

**Symptoms:**
- Images appear broken or don't load
- Images not responsive or optimized

**Solutions:**

1. **Check Image Paths**
   ```astro
   <!-- ❌ Wrong - missing leading slash -->
   <img src="assets/images/hero.jpg" alt="Hero" />
   
   <!-- ✅ Correct - absolute path from public -->
   <img src="/assets/images/hero.jpg" alt="Hero" />
   ```

2. **Verify Image Exists**
   ```bash
   # Check image exists in public directory
   ls -la public/assets/images/
   ```

3. **Use Proper Image Optimization**
   ```astro
   ---
   import { Image } from 'astro:assets';
   import heroImage from '@assets/hero.jpg';
   ---
   
   <!-- Optimized with Astro assets -->
   <Image src={heroImage} alt="Hero" width={800} height={400} />
   ```

## 🌐 SEO & Meta Issues

### Issue: SEO Meta Tags Not Working

**Symptoms:**
- Social media previews not showing
- Search engines not indexing properly

**Solutions:**

1. **Check SEO Component Import**
   ```astro
   ---
   // src/layouts/Base.astro
   import SEO from '@components/head/SEO.astro';
   
   const { seo } = Astro.props;
   ---
   
   <head>
     <SEO {seo} />
   </head>
   ```

2. **Verify SEO Props Format**
   ```astro
   ---
   // Page component
   const seo = {
     title: 'Page Title | Site Name',
     description: 'Page description for SEO',
     image: '/assets/images/og-image.jpg',
     url: Astro.url.href
   };
   ---
   
   <Layout {seo}>
     <!-- page content -->
   </Layout>
   ```

3. **Check Sitemap Generation**
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     site: 'https://yourdomain.com', // Required for sitemap
     sitemap: true,
     integrations: [sitemap()]
   });
   ```

4. **Test Social Media Cards**
   ```
   Use tools like:
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - LinkedIn Post Inspector
   ```

## ⚡ Performance Issues

### Issue: Slow Page Load Times

**Symptoms:**
- Pages take long time to load
- Poor Lighthouse scores

**Solutions:**

1. **Check Bundle Size**
   ```bash
   # Analyze bundle after build
   npm run build
   du -sh dist/
   find dist/ -name "*.js" -exec ls -lh {} \;
   ```

2. **Optimize Images**
   ```astro
   <!-- Use modern formats and proper sizing -->
   <picture>
     <source srcset="/assets/hero.webp" type="image/webp" />
     <img src="/assets/hero.jpg" alt="Hero" loading="lazy" />
   </picture>
   ```

3. **Check for Unused Dependencies**
   ```bash
   # Find unused dependencies
   npx depcheck
   
   # Remove unused packages
   npm uninstall unused-package
   ```

4. **Enable Compression**
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     compressHTML: true,
     build: {
       inlineStylesheets: 'auto'
     }
   });
   ```

### Issue: Theme Switching Performance

**Symptoms:**
- Lag when switching themes
- Flickering during theme transitions

**Solutions:**

1. **Optimize CSS Transitions**
   ```css
   /* Limit transitions to specific properties */
   * {
     transition: 
       background-color var(--theme-transition),
       color var(--theme-transition),
       border-color var(--theme-transition);
     /* Avoid: transition: all */
   }
   ```

2. **Preload Theme Assets**
   ```typescript
   // Preload theme images
   private async _preloadThemeAssets(theme: string) {
     const image = new Image();
     image.src = `/assets/images/home/${theme}-hero.jpg`;
     
     return new Promise((resolve) => {
       image.onload = resolve;
       image.onerror = resolve; // Don't block on errors
     });
   }
   ```

3. **Use CSS containment**
   ```css
   .theme-dependent-component {
     contain: style layout;
   }
   ```

## 🔧 TypeScript Issues

### Issue: TypeScript Errors in Components

**Symptoms:**
- Build fails with TypeScript errors
- IDE shows type errors

**Solutions:**

1. **Check Interface Definitions**
   ```typescript
   // ❌ Wrong - missing export
   interface Props {
     title: string;
   }
   
   // ✅ Correct - exported interface
   export interface Props {
     title: string;
     description?: string; // Optional props with ?
   }
   ```

2. **Verify Astro Props Usage**
   ```astro
   ---
   export interface Props {
     title: string;
     variant?: 'primary' | 'secondary';
   }
   
   // ✅ Correct destructuring with defaults
   const { title, variant = 'primary' } = Astro.props;
   ---
   ```

3. **Check Type Imports**
   ```astro
   ---
   // Import types with 'type' keyword
   import type { Props } from './types';
   import Component from './Component.astro';
   ---
   ```

## 🐛 Debugging Strategies

### Enable Debug Mode

1. **Component Debug Output**
   ```astro
   ---
   const isDev = import.meta.env.DEV;
   const debug = Astro.url.searchParams.has('debug');
   
   if (isDev && debug) {
     console.log('Component props:', Astro.props);
   }
   ---
   
   {isDev && debug && (
     <pre>{JSON.stringify(Astro.props, null, 2)}</pre>
   )}
   ```

2. **Theme Debug Panel**
   ```astro
   {import.meta.env.DEV && (
     <div style="position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 1px solid #ccc;">
       <h4>Debug Info</h4>
       <p>Theme: <span id="current-theme"></span></p>
       <script>
         document.getElementById('current-theme').textContent = 
           document.documentElement.getAttribute('data-theme');
       </script>
     </div>
   )}
   ```

### Browser DevTools Usage

1. **Check Console Errors**
   ```
   F12 → Console tab
   Look for:
   - JavaScript errors (red text)
   - Network failures (failed requests)
   - Warning messages
   ```

2. **Inspect Network Requests**
   ```
   F12 → Network tab → Reload page
   Check for:
   - Failed resource loads (404s)
   - Slow loading assets
   - CORS errors
   ```

3. **Examine Element Styles**
   ```
   F12 → Elements tab → Select element
   Check:
   - Computed styles
   - CSS variable values
   - Applied/overridden styles
   ```

### Performance Debugging

1. **Lighthouse Audit**
   ```bash
   # Install Lighthouse CLI
   npm install -g lighthouse
   
   # Run audit
   lighthouse http://localhost:4321 --view
   ```

2. **Bundle Analysis**
   ```bash
   # Analyze what's in your bundle
   npx vite-bundle-analyzer dist
   ```

3. **Performance Monitoring**
   ```javascript
   // Add to page for performance tracking
   window.addEventListener('load', () => {
     const navTiming = performance.getEntriesByType('navigation')[0];
     console.log('Page load time:', navTiming.loadEventEnd - navTiming.fetchStart);
   });
   ```

## 📞 Getting Help

### Useful Commands for Bug Reports

```bash
# System information
node --version
npm --version
npm list astro @astrojs/lit @astrojs/mdx

# Project information
cat package.json
cat astro.config.mjs
cat tsconfig.json

# Error reproduction
npm run build > build.log 2>&1
npm run dev > dev.log 2>&1
```

### Creating Minimal Reproductions

1. Start with a fresh Astro project
2. Add only the specific component/feature causing issues
3. Include minimal test case
4. Share reproduction repository or CodeSandbox

This troubleshooting guide covers the most common issues encountered when working with the Astro Odyssey Theme. For additional help, refer to the [Astro documentation](https://docs.astro.build) or create an issue with a minimal reproduction.