# Astro Odyssey Theme - Developer Guide

## 🚀 Quick Start

This guide provides comprehensive instructions for developers working with, extending, and customizing the Astro Odyssey Theme.

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm (included with Node.js)
- **Basic Knowledge**: HTML, CSS, JavaScript, and basic Astro concepts

## ⚡ Development Setup

### Initial Setup
```bash
# Clone or download the theme
git clone [repository-url]
cd astro-odyssey-theme

# Install dependencies
npm install

# Start development server
npm run dev
# Server starts at http://localhost:4321
```

### Development Commands
```bash
npm run dev        # Development server with hot reload
npm run build      # Production build to ./dist/
npm run preview    # Preview production build locally
npm run format     # Format code with Prettier
```

## 🏗️ Core Development Patterns

### File Organization Strategy

Follow the established component organization:

```
src/components/
├── core/          # Fundamental layout components
├── sections/      # Page section compositions
├── forms/         # Form components and fields
├── buttons/       # Button variants
├── cards/         # Card components
└── [feature]/     # Feature-specific components
```

### Component Creation Pattern

#### 1. Basic Component Structure
```astro
---
// ComponentName.astro
export interface Props {
  title?: string;
  variant?: 'primary' | 'secondary';
  narrow?: boolean;
}

const { title, variant = 'primary', narrow = false } = Astro.props;
---

<div class:list={[
  'component-name',
  `component-name--${variant}`,
  { 'component-name--narrow': narrow }
]}>
  {title && <h2>{title}</h2>}
  <slot />
</div>

<style>
  .component-name {
    background-color: var(--theme-surface-1);
    color: var(--theme-on-surface-1);
    padding: var(--section-margin);
    border-radius: var(--theme-shape-radius);
    transition: var(--theme-transition);
  }
  
  .component-name--primary {
    background-color: var(--theme-primary);
    color: var(--theme-on-primary);
  }
  
  .component-name--narrow {
    max-width: var(--container-max-width-narrow);
  }
</style>
```

#### 2. TypeScript Interface Pattern
```typescript
// src/types/components.ts
export interface ComponentProps {
  title?: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  narrow?: boolean;
  className?: string;
}
```

### Configuration Integration

#### Using Site Configuration
```astro
---
// Import site settings
import settings from '@config/settings';
import { nav } from '@config/nav';

// Use configuration in component logic
const { enableThemeSwitcher } = settings;
---

<div class="component">
  {enableThemeSwitcher && (
    <theme-switcher></theme-switcher>
  )}
</div>
```

#### Navigation Integration
```astro
---
import { nav } from '@config/nav';
---

<nav>
  {nav.map((item) => (
    <a href={item.slug}>{item.title}</a>
  ))}
</nav>
```

## 🎨 Styling & Theming Development

### CSS Custom Property Usage

#### Theme-Aware Styling
```css
.my-component {
  /* Use theme variables for consistency */
  background: var(--theme-surface-1);
  color: var(--theme-on-surface-1);
  border: 1px solid var(--theme-surface-2);
  
  /* Use layout variables */
  padding: var(--section-margin);
  border-radius: var(--theme-shape-radius);
  
  /* Use transition variables */
  transition: var(--theme-transition);
}

.my-component:hover {
  background: var(--theme-surface-2);
  color: var(--theme-on-surface-2);
}
```

#### Responsive Design Pattern
```css
.component {
  /* Mobile-first approach */
  padding: 1rem;
  font-size: var(--font-size-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--section-margin);
    font-size: var(--font-size-base);
  }
}
```

### Theme Extension

#### Adding Custom Themes
```css
/* Add to src/styles/theme.css */
[data-theme='custom'] {
  --theme-primary: #your-brand-color;
  --theme-primary-hover: #your-hover-color;
  --theme-bg: #your-background;
  --theme-surface-1: #your-surface;
  /* Define all required variables */
}
```

#### Component-Specific Theme Overrides
```css
[data-theme='dark'] .special-component {
  /* Dark theme specific styles */
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

[data-theme='earth'] .nature-component {
  /* Earth theme specific styles */
  background-image: url('/assets/patterns/leaves.svg');
}
```

## 📝 Content Management Patterns

### Page Creation

#### Standard Page Pattern
```astro
---
// src/pages/new-page.astro
import Layout from '@layouts/Page.astro';
import Container from '@components/core/Container.astro';
import TextSection from '@components/sections/TextSection.astro';

const seo = {
  title: 'New Page | Your Site',
  description: 'Description for the new page'
};
---

<Layout {seo}>
  <Container>
    <TextSection narrow>
      <h1>Page Title</h1>
      <p>Page content goes here.</p>
    </TextSection>
  </Container>
</Layout>
```

#### Landing Page Pattern
```astro
---
// src/pages/landing-pages/product.astro
import Layout from '@layouts/Page.astro';
import HeroSection from '@components/sections/HeroSection.astro';
import ThreeColumnTextSection from '@components/sections/ThreeColumnTextSection.astro';
import CtaCardSection from '@components/sections/CtaCardSection.astro';
---

<Layout seo={{title: 'Product Landing', description: 'Product description'}}>
  <HeroSection>
    <h1>Product Name</h1>
    <p>Compelling product description</p>
  </HeroSection>
  
  <ThreeColumnTextSection>
    <!-- Feature content -->
  </ThreeColumnTextSection>
  
  <CtaCardSection>
    <!-- Call-to-action content -->
  </CtaCardSection>
</Layout>
```

### Blog Development

#### Blog Post Creation
```mdx
---
# src/pages/blog/posts/new-post.mdx
layout: '../../../layouts/Post.astro'
title: 'Blog Post Title'
description: 'Post description for SEO'
publishDate: '2024-01-15'
tags: ['development', 'astro', 'tutorial']
author: 'Author Name'
---

import { YouTubeEmbed } from '@components/odyssey-theme';
import Button from '@components/buttons/Button.astro';

# Blog Post Content

Regular markdown content with component embedding:

<YouTubeEmbed url="https://youtube.com/watch?v=..." rounded />

<Button href="/contact">Get Started</Button>
```

#### Custom Blog Components
```astro
---
// src/components/blog/CodeBlock.astro
export interface Props {
  language?: string;
  title?: string;
}

const { language = 'text', title } = Astro.props;
---

<div class="code-block">
  {title && <div class="code-block__title">{title}</div>}
  <pre class={`language-${language}`}>
    <code>
      <slot />
    </code>
  </pre>
</div>

<style>
  .code-block {
    background: var(--theme-surface-1);
    border-radius: var(--theme-shape-radius);
    overflow: hidden;
    margin: 1rem 0;
  }
  
  .code-block__title {
    background: var(--theme-surface-2);
    color: var(--theme-on-surface-2);
    padding: 0.5rem 1rem;
    font-size: var(--font-size-sm);
  }
  
  pre {
    padding: 1rem;
    margin: 0;
    overflow-x: auto;
  }
</style>
```

## 🔧 Component Extension Patterns

### Extending Existing Components

#### Component Composition
```astro
---
// src/components/enhanced/SuperButton.astro
import Button from '@components/buttons/Button.astro';
import { Icon } from 'astro-icon/components';

export interface Props {
  icon?: string;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const { icon, loading = false, size = 'medium', ...buttonProps } = Astro.props;
---

<Button class:list={[`button--${size}`, { 'button--loading': loading }]} {...buttonProps}>
  {loading ? (
    <Icon name="mdi:loading" class="loading-spinner" />
  ) : icon ? (
    <Icon name={icon} />
  ) : null}
  <slot />
</Button>

<style>
  .button--small {
    padding: 0.5rem 1rem;
    font-size: var(--font-size-sm);
  }
  
  .button--large {
    padding: 1rem 2rem;
    font-size: var(--font-size-lg);
  }
  
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
```

#### Component Variants
```astro
---
// src/components/cards/ProductCard.astro
import FeatureCard from '@components/cards/FeatureCard.astro';
import Button from '@components/buttons/Button.astro';

export interface Props {
  product: {
    name: string;
    price: string;
    image: string;
    features: string[];
  };
  featured?: boolean;
}

const { product, featured = false } = Astro.props;
---

<FeatureCard class:list={['product-card', { 'product-card--featured': featured }]}>
  <img src={product.image} alt={product.name} class="product-image" />
  <h3>{product.name}</h3>
  <div class="price">{product.price}</div>
  
  <ul class="features">
    {product.features.map(feature => (
      <li>{feature}</li>
    ))}
  </ul>
  
  <Button href={`/products/${product.slug}`} variant="primary">
    Learn More
  </Button>
</FeatureCard>

<style>
  .product-card {
    text-align: center;
  }
  
  .product-card--featured {
    border: 2px solid var(--theme-primary);
    transform: scale(1.05);
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--theme-shape-radius);
  }
  
  .price {
    font-size: var(--font-size-xl);
    font-weight: bold;
    color: var(--theme-primary);
    margin: 1rem 0;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }
  
  .features li {
    padding: 0.25rem 0;
    border-bottom: 1px solid var(--theme-surface-1);
  }
</style>
```

### Creating Section Components

#### Complex Section Pattern
```astro
---
// src/components/sections/PricingSection.astro
import Container from '@components/core/Container.astro';
import ProductCard from '@components/cards/ProductCard.astro';

export interface Props {
  title?: string;
  description?: string;
  plans: Array<{
    name: string;
    price: string;
    features: string[];
    featured?: boolean;
  }>;
  narrow?: boolean;
}

const { 
  title = 'Pricing Plans',
  description,
  plans,
  narrow = false 
} = Astro.props;
---

<Container {narrow}>
  <section class="pricing-section">
    <div class="pricing-header">
      <h2>{title}</h2>
      {description && <p class="description">{description}</p>}
    </div>
    
    <div class="pricing-grid">
      {plans.map(plan => (
        <ProductCard product={plan} featured={plan.featured} />
      ))}
    </div>
  </section>
</Container>

<style>
  .pricing-section {
    padding: var(--section-margin) 0;
  }
  
  .pricing-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .pricing-header h2 {
    font-size: var(--font-size-3xl);
    margin-bottom: 1rem;
  }
  
  .description {
    font-size: var(--font-size-lg);
    color: var(--theme-on-bg);
    opacity: 0.8;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--theme-grid-gap);
    align-items: start;
  }
  
  @media (max-width: 768px) {
    .pricing-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

## 🔌 Integration Patterns

### Form Integration

#### Custom Form Components
```astro
---
// src/components/forms/NewsletterSignup.astro
import Input from '@components/form-fields/Input.astro';
import Button from '@components/buttons/Button.astro';

export interface Props {
  action?: string;
  method?: string;
  title?: string;
}

const { 
  action = '/api/newsletter',
  method = 'POST',
  title = 'Subscribe to Our Newsletter'
} = Astro.props;
---

<form class="newsletter-form" {action} {method}>
  <h3>{title}</h3>
  
  <div class="form-group">
    <Input 
      type="email"
      name="email"
      placeholder="Enter your email"
      required
    />
  </div>
  
  <Button type="submit" variant="primary">
    Subscribe
  </Button>
</form>

<style>
  .newsletter-form {
    background: var(--theme-surface-1);
    padding: 2rem;
    border-radius: var(--theme-shape-radius);
    text-align: center;
  }
  
  .form-group {
    margin: 1rem 0;
  }
  
  .newsletter-form h3 {
    margin-bottom: 1rem;
    color: var(--theme-on-surface-1);
  }
</style>
```

#### Form Validation Pattern
```astro
---
// src/components/forms/ContactFormAdvanced.astro
---

<form class="contact-form" data-form="contact">
  <div class="form-row">
    <Input 
      name="name"
      placeholder="Full Name"
      required
      data-validate="required"
    />
    <Input 
      type="email"
      name="email"
      placeholder="Email Address"
      required
      data-validate="email"
    />
  </div>
  
  <Textarea 
    name="message"
    placeholder="Your Message"
    required
    data-validate="required minlength:10"
  />
  
  <Button type="submit">Send Message</Button>
  
  <div class="form-status" id="form-status"></div>
</form>

<script>
  // Form validation and submission
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-form="contact"]');
    
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form as HTMLFormElement);
      const statusEl = document.getElementById('form-status');
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          statusEl.innerHTML = '<p class="success">Message sent successfully!</p>';
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        statusEl.innerHTML = '<p class="error">Failed to send message. Please try again.</p>';
      }
    });
  });
</script>

<style>
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
  
  .form-status .success {
    color: green;
    background: rgba(0, 255, 0, 0.1);
    padding: 1rem;
    border-radius: var(--theme-shape-radius);
  }
  
  .form-status .error {
    color: red;
    background: rgba(255, 0, 0, 0.1);
    padding: 1rem;
    border-radius: var(--theme-shape-radius);
  }
</style>
```

### Icon Integration

#### Using Astro Icon
```astro
---
// Component with icons
import { Icon } from 'astro-icon/components';
---

<div class="feature">
  <Icon name="mdi:check-circle" class="feature-icon" />
  <h3>Feature Title</h3>
  <p>Feature description</p>
</div>

<style>
  .feature-icon {
    width: 2rem;
    height: 2rem;
    color: var(--theme-primary);
    margin-bottom: 1rem;
  }
</style>
```

#### Custom Icon System
```astro
---
// src/components/icons/CustomIcon.astro
export interface Props {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const { name, size = 'medium', color } = Astro.props;

const sizeMap = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem'
};
---

<svg 
  class="custom-icon"
  width={sizeMap[size]}
  height={sizeMap[size]}
  style={color ? `color: ${color}` : undefined}
>
  <use href={`/assets/icons/sprite.svg#${name}`}></use>
</svg>

<style>
  .custom-icon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
</style>
```

## 🚀 Performance Optimization

### Image Optimization

#### Responsive Images
```astro
---
// src/components/media/ResponsiveImage.astro
export interface Props {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const { 
  src, 
  alt, 
  sizes = '(max-width: 768px) 100vw, 50vw',
  loading = 'lazy'
} = Astro.props;
---

<picture class="responsive-image">
  <source 
    media="(max-width: 768px)"
    srcset={`${src}?w=400&f=webp 400w, ${src}?w=800&f=webp 800w`}
    type="image/webp"
  />
  <source 
    media="(min-width: 769px)"
    srcset={`${src}?w=600&f=webp 600w, ${src}?w=1200&f=webp 1200w`}
    type="image/webp"
  />
  <img 
    src={`${src}?w=800`}
    {alt}
    {sizes}
    {loading}
    class="responsive-image__img"
  />
</picture>

<style>
  .responsive-image {
    display: block;
    width: 100%;
  }
  
  .responsive-image__img {
    width: 100%;
    height: auto;
    border-radius: var(--theme-shape-radius);
  }
</style>
```

### Code Splitting

#### Dynamic Component Loading
```astro
---
// Conditional component loading
const { showAdvancedFeatures } = Astro.props;
---

<div class="page-content">
  <slot />
  
  {showAdvancedFeatures && (
    <Fragment>
      {/* Only load when needed */}
      <script>
        import('@components/advanced/AdvancedWidget.astro')
          .then(module => {
            // Initialize advanced features
          });
      </script>
    </Fragment>
  )}
</div>
```

## 🧪 Testing Patterns

### Component Testing

#### Visual Testing Setup
```javascript
// tests/visual.test.js
import { test, expect } from '@playwright/test';

test.describe('Theme Components', () => {
  test('Button variants render correctly', async ({ page }) => {
    await page.goto('/theme/style-guide');
    
    // Test each button variant
    const primaryButton = page.locator('[data-testid="button-primary"]');
    await expect(primaryButton).toBeVisible();
    
    // Visual regression testing
    await expect(page).toHaveScreenshot('buttons-light-theme.png');
    
    // Switch to dark theme
    await page.click('[data-theme-button="dark"]');
    await expect(page).toHaveScreenshot('buttons-dark-theme.png');
  });
});
```

#### Accessibility Testing
```javascript
// tests/accessibility.test.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('Homepage meets WCAG standards', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('main')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

## 📦 Deployment Patterns

### Build Optimization

#### Production Configuration
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Production optimizations
  build: {
    inlineStylesheets: 'auto',
    assetsPrefix: process.env.CDN_URL,
  },
  
  // Performance optimizations
  compressHTML: true,
  
  // SEO optimizations
  site: process.env.SITE_URL || 'https://your-domain.com',
  sitemap: true,
  
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['lit'],
            theme: ['./src/styles/theme.css']
          }
        }
      }
    }
  }
});
```

#### Environment Configuration
```javascript
// src/config/environment.js
const environment = {
  development: {
    apiUrl: 'http://localhost:3000',
    enableDebug: true,
    analytics: false
  },
  production: {
    apiUrl: 'https://api.yoursite.com',
    enableDebug: false,
    analytics: true
  }
};

export default environment[import.meta.env.MODE] || environment.development;
```

## 🔍 Debugging & Development Tools

### Debug Utilities

#### Component Debug Mode
```astro
---
// Add to any component for debugging
const isDev = import.meta.env.DEV;
const debug = Astro.url.searchParams.has('debug');

if (isDev && debug) {
  console.log('Component props:', Astro.props);
  console.log('Component slots:', Astro.slots);
}
---

{isDev && debug && (
  <div class="debug-panel">
    <pre>{JSON.stringify(Astro.props, null, 2)}</pre>
  </div>
)}
```

#### Theme Debug Tool
```astro
---
// src/components/debug/ThemeDebugger.astro
---

{import.meta.env.DEV && (
  <div class="theme-debugger">
    <h4>Current Theme Variables</h4>
    <div class="theme-vars">
      <div class="var-sample" style="background: var(--theme-primary)">Primary</div>
      <div class="var-sample" style="background: var(--theme-surface-1)">Surface 1</div>
      <div class="var-sample" style="background: var(--theme-surface-2)">Surface 2</div>
    </div>
  </div>
)}

<style>
  .theme-debugger {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: white;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 9999;
    font-size: 12px;
  }
  
  .var-sample {
    padding: 0.5rem;
    margin: 0.25rem 0;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  }
</style>
```

This developer guide provides comprehensive patterns and best practices for extending and customizing the Astro Odyssey Theme, covering everything from basic component creation to advanced optimization techniques.