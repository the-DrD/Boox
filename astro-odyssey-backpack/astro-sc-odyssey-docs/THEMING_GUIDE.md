# Astro Odyssey Theme - Theming & Customization Guide

## 🎨 Overview

The Astro Odyssey Theme features a sophisticated theming system built on CSS custom properties (CSS variables) that enables runtime theme switching and easy customization. This guide covers the complete theming architecture and customization patterns.

## 🏗️ Theming Architecture

### CSS Custom Property System

The theming system is built on CSS custom properties defined in `src/styles/theme.css` with a hierarchical override structure:

```css
:root {
  /* Default theme variables - fallback values */
}

[data-theme='default'] {
  /* Light theme - explicit values */
}

[data-theme='dark'] {
  /* Dark theme - overrides */
}

[data-theme='earth'] {
  /* Earth theme - overrides */
}

/* Additional themes... */
```

### Theme Application Architecture

1. **Base Theme**: `:root` defines default values as fallbacks
2. **Theme Selection**: `data-theme` attribute on `<html>` activates theme
3. **Component Usage**: Components reference CSS custom properties
4. **Runtime Switching**: JavaScript changes `data-theme` attribute
5. **Persistence**: localStorage maintains theme choice across sessions

## 📋 Complete Theming Variables

### Color System Variables

#### Primary Colors
```css
--theme-primary: hsl(0, 0%, 0%);           /* Main brand color */
--theme-primary-hover: hsl(0, 0%, 20%);    /* Hover state for primary */
--theme-on-primary: #fff;                  /* Text/content on primary */
```

#### Background & Surface Colors
```css
--theme-bg: #fff;                          /* Main background */
--theme-on-bg: #000;                       /* Text on main background */

--theme-surface-1: #f2f2f2;                /* Card/section backgrounds */
--theme-on-surface-1: #000;                /* Text on surface-1 */

--theme-surface-2: #cce6d0;                /* Secondary surfaces */
--theme-on-surface-2: #000;                /* Text on surface-2 */
```

### Layout & Spacing Variables

#### Container System
```css
--container-max-width: 1440px;             /* Maximum content width */
--container-max-width-narrow: 960px;       /* Narrow content width */
--container-padding: 0 1rem;               /* Container side padding */
```

#### Layout Spacing
```css
--section-margin: 3rem;                    /* Space between sections */
--theme-grid-gap: 1rem;                    /* Grid system gap */
--theme-blog-post-header-width: 1200px;    /* Blog post header width */
```

### Shape & Border Variables

#### Border Radius System
```css
--theme-shape-radius: clamp(1rem, 2rem, 3rem);  /* Cards, images, etc. */
--theme-button-border-radius: 3rem;             /* Button border radius */
```

**Special Note**: Set `--theme-shape-radius: 0` for straight edges throughout the design.

### Animation & Transition Variables

```css
--theme-transition: 0.2s ease-in-out;      /* Standard transition timing */
```

### Typography Variables

```css
--theme-font-family-serif: 'Roboto Serif', Georgia, Cambria, 'Times New Roman', Times, serif;
--theme-font-family-sans: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Form Field Variables

```css
--form-field-input-color: var(--theme-on-bg);  /* Form input text color */
```

## 🎨 Built-in Theme Definitions

### Default Theme (Light)
```css
[data-theme='default'] {
  color-scheme: light;
  --theme-primary: hsl(0, 0%, 0%);
  --theme-bg: #fff;
  --theme-surface-1: #f2f2f2;
  --theme-surface-2: #cce6d0;
  /* Clean, minimalist appearance */
}
```

### Dark Theme
```css
[data-theme='dark'] {
  color-scheme: dark;
  --theme-primary: hsl(0, 0%, 100%);      /* White primary */
  --theme-bg: hsl(0, 0%, 2%);             /* Very dark background */
  --theme-surface-1: hsl(0, 0%, 20%);     /* Dark surfaces */
  --theme-shape-radius: 0;                /* Straight edges */
  /* Modern, high-contrast appearance */
}
```

### Earth Theme
```css
[data-theme='earth'] {
  --theme-primary: #2c3e2d;               /* Deep green */
  --theme-bg: #eeeff1;                    /* Light gray */
  --theme-surface-1: #e6e4e0;             /* Warm gray */
  --theme-surface-2: #c3d9c4;             /* Light green */
  --theme-button-border-radius: 0.5rem;   /* Subtle rounding */
  /* Natural, earthy appearance */
}
```

### Ocean Theme
```css
[data-theme='ocean'] {
  --theme-primary: #1556ac;               /* Ocean blue */
  --theme-bg: #fafafa;                    /* Clean white */
  --theme-surface-1: #eef1f3;             /* Light blue-gray */
  --theme-surface-2: #072650;             /* Deep blue */
  /* Professional, maritime appearance */
}
```

### Sand Theme
```css
[data-theme='sand'] {
  --theme-primary: #e38a20;               /* Warm orange */
  --theme-bg: #fffffe;                    /* Warm white */
  --theme-surface-1: #ffecd9;             /* Light peach */
  --theme-surface-2: #6a4d34;             /* Warm brown */
  --theme-button-border-radius: 0.5rem;   /* Subtle rounding */
  /* Warm, desert-inspired appearance */
}
```

## ⚙️ Theme Switching Implementation

### JavaScript Theme Switcher

The theme switcher is implemented as a Lit web component in `src/components/theme-switcher/theme-switcher.ts`:

#### Core Functionality
```typescript
class ThemeSwitcher extends LitElement {
  private _setTheme(theme: string) {
    // 1. Update HTML data attribute
    document.firstElementChild.setAttribute('data-theme', theme);
    
    // 2. Update hero image based on theme
    const heroImage = document.querySelector('#home-hero-image');
    if (theme === 'dark') {
      heroImage.src = '/assets/images/home/dark-hero.jpg';
    }
    // ... other theme image updates
    
    // 3. Store theme preference
    localStorage.setItem('theme', theme);
    
    // 4. Update component state
    this.theme = theme;
  }
}
```

#### Theme Detection & Initialization
```typescript
private _getCurrentTheme() {
  // 1. Check localStorage first
  const saved = localStorage.getItem('theme');
  if (saved) {
    this._setTheme(saved);
    return;
  }
  
  // 2. Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    this._setTheme('dark');
  } else {
    this._setTheme('default');
  }
}
```

### Theme Configuration

Themes are configured in the theme switcher component:

```typescript
const themes = [
  { name: 'default', icon: classicThemeIcon, label: 'Classic' },
  { name: 'dark', icon: darkThemeIcon, label: 'Dark' },
  { name: 'earth', icon: earthThemeIcon, label: 'Earth' },
  { name: 'ocean', icon: blueThemeIcon, label: 'Ocean' },
  { name: 'sand', icon: orangeThemeIcon, label: 'Sand' }
];
```

## 🛠️ Customization Patterns

### Creating a New Theme

#### 1. Define Theme Variables
Add your theme to `src/styles/theme.css`:

```css
[data-theme='custom'] {
  /* Define all required variables */
  --theme-primary: #your-color;
  --theme-primary-hover: #your-hover-color;
  --theme-on-primary: #your-text-color;
  
  --theme-bg: #your-background;
  --theme-on-bg: #your-text;
  
  --theme-surface-1: #your-surface;
  --theme-on-surface-1: #your-surface-text;
  
  --theme-surface-2: #your-accent-surface;
  --theme-on-surface-2: #your-accent-text;
  
  /* Optional: Customize shapes */
  --theme-shape-radius: 1rem;
  --theme-button-border-radius: 0.5rem;
}
```

#### 2. Add Theme Images (Optional)
Create theme-specific hero images:
- `/public/assets/images/home/custom-hero.jpg`

#### 3. Update Theme Switcher
Add your theme to the themes array in `theme-switcher.ts`:

```typescript
import { customThemeIcon } from './icons';

const themes = [
  // ... existing themes
  {
    name: 'custom',
    icon: customThemeIcon,
    label: 'Custom'
  }
];
```

#### 4. Update Image Switching Logic
Add image switching logic in `_setTheme()`:

```typescript
if (theme === 'custom') {
  _heroImage.src = '/assets/images/home/custom-hero.jpg';
}
```

### Modifying Existing Themes

#### Color Adjustments
```css
[data-theme='dark'] {
  /* Override specific colors */
  --theme-primary: #your-new-primary;
  --theme-surface-1: #your-new-surface;
}
```

#### Layout Modifications
```css
[data-theme='earth'] {
  /* Adjust layout properties */
  --container-max-width: 1200px;
  --section-margin: 4rem;
  --theme-grid-gap: 1.5rem;
}
```

#### Shape Customization
```css
[data-theme='ocean'] {
  /* Change shape characteristics */
  --theme-shape-radius: 0;              /* Straight edges */
  --theme-button-border-radius: 2px;     /* Minimal rounding */
}
```

### Global Theme Customization

#### Modify Base Variables
Update `:root` in `theme.css` to change defaults:

```css
:root {
  /* Update global defaults */
  --container-max-width: 1600px;         /* Wider layouts */
  --section-margin: 4rem;                /* More spacing */
  --theme-transition: 0.3s ease-out;     /* Slower transitions */
}
```

#### Typography Customization
```css
:root {
  /* Update font families */
  --theme-font-family-sans: 'Inter', system-ui, sans-serif;
  --theme-font-family-serif: 'Playfair Display', serif;
}
```

## 🎯 Component Usage Patterns

### Using Theme Variables in Components

#### Basic Color Usage
```astro
<!-- Button.astro -->
<style>
  .button {
    background-color: var(--theme-primary);
    color: var(--theme-on-primary);
    border-radius: var(--theme-button-border-radius);
  }
  
  .button:hover {
    background-color: var(--theme-primary-hover);
  }
</style>
```

#### Layout Variables
```astro
<!-- Container.astro -->
<style>
  .container {
    max-width: var(--container-max-width);
    padding: var(--container-padding);
  }
  
  .container--narrow {
    max-width: var(--container-max-width-narrow);
  }
</style>
```

#### Surface & Background Usage
```astro
<!-- Card.astro -->
<style>
  .card {
    background-color: var(--theme-surface-1);
    color: var(--theme-on-surface-1);
    border-radius: var(--theme-shape-radius);
    transition: var(--theme-transition);
  }
</style>
```

### Conditional Theme Styling

#### Theme-Specific Styles
```css
/* Apply only to dark theme */
[data-theme='dark'] .special-component {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Apply only to earth theme */
[data-theme='earth'] .nature-element {
  background-image: url('/assets/textures/earth-pattern.svg');
}
```

#### Component-Level Theme Detection
```astro
---
// Component.astro
---
<div class="component">
  <slot />
</div>

<style>
  .component {
    background: var(--theme-surface-1);
  }
  
  /* Theme-specific overrides */
  [data-theme='dark'] .component {
    border: 1px solid var(--theme-surface-2);
  }
  
  [data-theme='ocean'] .component {
    box-shadow: 0 2px 8px rgba(21, 86, 172, 0.1);
  }
</style>
```

## 🔧 Advanced Customization

### Creating Theme Variants

#### Color Scheme Variations
```css
[data-theme='dark-blue'] {
  color-scheme: dark;
  --theme-primary: #2563eb;
  --theme-bg: #0f172a;
  --theme-surface-1: #1e293b;
  /* Blue-tinted dark theme */
}

[data-theme='warm-light'] {
  color-scheme: light;
  --theme-primary: #d97706;
  --theme-bg: #fefce8;
  --theme-surface-1: #fef3c7;
  /* Warm-tinted light theme */
}
```

#### Seasonal Themes
```css
[data-theme='winter'] {
  --theme-primary: #1e40af;
  --theme-bg: #f8fafc;
  --theme-surface-1: #e2e8f0;
  --theme-surface-2: #3b82f6;
}

[data-theme='autumn'] {
  --theme-primary: #c2410c;
  --theme-bg: #fefaf5;
  --theme-surface-1: #fed7aa;
  --theme-surface-2: #9a3412;
}
```

### Dynamic Theme Properties

#### Responsive Theme Adjustments
```css
[data-theme='default'] {
  --theme-shape-radius: clamp(0.5rem, 2vw, 2rem);
  --section-margin: clamp(2rem, 5vw, 4rem);
}

@media (max-width: 768px) {
  [data-theme='default'] {
    --container-padding: 0 1rem;
    --theme-grid-gap: 0.75rem;
  }
}
```

#### Print Theme Support
```css
@media print {
  [data-theme] {
    --theme-primary: #000;
    --theme-bg: #fff;
    --theme-on-bg: #000;
    --theme-surface-1: #fff;
    --theme-shape-radius: 0;
  }
}
```

### Theme System Extensions

#### Adding Theme Metadata
```typescript
// Enhanced theme configuration
const themes = [
  {
    name: 'default',
    label: 'Classic',
    icon: classicThemeIcon,
    description: 'Clean and minimal design',
    category: 'light'
  },
  {
    name: 'dark',
    label: 'Dark',
    icon: darkThemeIcon,
    description: 'Modern dark interface',
    category: 'dark'
  }
  // ... more themes
];
```

#### Theme Validation
```typescript
// Validate theme exists before applying
private _setTheme(theme: string) {
  const validTheme = themes.find(t => t.name === theme);
  if (!validTheme) {
    console.warn(`Theme "${theme}" not found, falling back to default`);
    theme = 'default';
  }
  
  this._doc.setAttribute('data-theme', theme);
  // ... rest of implementation
}
```

## 🚀 Performance Considerations

### CSS Custom Property Performance

#### Efficient Variable Scoping
```css
/* Good: Scope variables to specific themes */
[data-theme='dark'] {
  --theme-primary: #fff;
}

/* Avoid: Deeply nested variable inheritance */
[data-theme='dark'] .component .nested .deep {
  --local-var: var(--theme-primary);
}
```

#### Transition Optimization
```css
/* Optimize theme transitions */
* {
  transition: 
    background-color var(--theme-transition),
    color var(--theme-transition),
    border-color var(--theme-transition);
}

/* Exclude expensive properties */
* {
  transition: background-color 0.2s ease-in-out;
  /* Avoid: box-shadow, transform in theme transitions */
}
```

### Image Loading Optimization

#### Preload Theme Images
```html
<!-- In Base.astro head -->
<link rel="preload" as="image" href="/assets/images/home/dark-hero.jpg">
<link rel="preload" as="image" href="/assets/images/home/earth-hero.jpg">
```

#### Lazy Theme Image Loading
```typescript
private async _setTheme(theme: string) {
  // Update theme immediately
  this._doc.setAttribute('data-theme', theme);
  
  // Lazy load theme-specific assets
  if (theme === 'dark') {
    const image = new Image();
    image.src = '/assets/images/home/dark-hero.jpg';
    image.onload = () => {
      const heroElement = document.querySelector('#home-hero-image');
      if (heroElement) heroElement.src = image.src;
    };
  }
}
```

## 🎨 Best Practices

### Design System Consistency

1. **Use Semantic Variable Names**: `--theme-primary` instead of `--blue-500`
2. **Maintain Contrast Ratios**: Ensure accessibility across all themes
3. **Test Color Combinations**: Verify readability in all theme variants
4. **Document Custom Properties**: Comment the purpose of each variable
5. **Progressive Enhancement**: Ensure fallbacks for unsupported browsers

### Development Workflow

1. **Theme Testing**: Test all components with each theme
2. **Color Validation**: Use tools to verify accessibility compliance
3. **Performance Monitoring**: Check theme switching performance
4. **Mobile Testing**: Verify themes work across devices
5. **Print Compatibility**: Test print styles with themes

This comprehensive theming system provides maximum flexibility while maintaining performance and accessibility standards.