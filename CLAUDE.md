# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a customized version of the Astro Odyssey Theme, specifically configured for business marketing websites with added Solutions and Industries functionality. The theme has been modified from the original to include:

- Custom dark theme as default (theme switcher disabled)
- Solutions section with dedicated components and pages
- Industries section with dedicated components and pages
- Enhanced component exports in odyssey-theme.js

## Development Commands

```bash
npm run dev        # Start development server at localhost:4321
npm run start      # Alias for npm run dev
npm run build      # Build production site to ./dist/
npm run preview    # Preview production build locally
npm run format     # Format code with Prettier
```

## Architecture & Key Customizations

### Theme Configuration
- **Default Theme**: Dark theme is now the default (not light)
- **Theme Switcher**: Disabled via `enableThemeSwitcher: false` in settings.js
- **Dark Theme Variables**: `:root` now contains dark theme values by default

### Navigation Structure
The site navigation includes custom business sections:
- Solutions (`/solutions`)
- Industries (`/industries`) 
- Standard sections: Home, Blog, About

### Component Architecture

#### New Business Components
- `SolutionsList.astro` & `SolutionCard.astro` - Solutions display components
- `IndustriesList.astro` & `IndustryCard.astro` - Industries display components
- Enhanced form fields: `FormInput.astro`, `FormTextarea.astro`, `FormSelect.astro`

#### Component Export System
- `src/components/odyssey-theme.js` exports all reusable components
- Components are organized by category: sections, blog, solutions, industries, forms
- Use `import { ComponentName } from '@components/odyssey-theme'` pattern

### TypeScript Path Mapping
```typescript
"@config": ["config/*"]           // Site configuration
"@components/*": ["components/*"] // All components  
"@layouts/*": ["layouts/*"]       // Page layouts
"@styles/*": ["styles/*"]         // CSS files
"@pages/*": ["pages/*"]           // Page components
"@assets/*": ["assets/*"]         // Static assets
"@utils/*": ["utils/*"]           // Utility functions
"@icons/*": ["icons/*"]           // Custom icons
```

### Configuration System
- `src/config/settings.js` - Global site settings (theme switcher disabled)
- `src/config/nav.js` - Main navigation including Solutions/Industries
- `src/config/footer.js` - Footer configuration

### Styling System
- **Default Theme**: Dark theme values in `:root`
- **Theme Variables**: CSS custom properties in `src/styles/theme.css`
- **Shape Radius**: Set to 0 for straight edges in dark theme
- **Color Scheme**: Uses HSL values for precise color control

## Key Implementation Details

### Theme Switching Disabled
The theme switcher component exists but is disabled. The site uses a fixed dark theme configuration.

### Business-Focused Structure
The codebase is structured for B2B marketing sites with:
- Solutions-focused content architecture
- Industry-specific components and pages
- Professional dark theme aesthetic

### Component Usage Pattern
```astro
---
import {
  SolutionsList,
  IndustriesList,
  ThreeColumnTextSection,
  CtaCardSection
} from '@components/odyssey-theme';
---

<SolutionsList />
<IndustriesList />
```

### Form Components Enhanced
New form field components provide consistent styling:
- `FormInput` - Text inputs with theme integration
- `FormTextarea` - Multi-line text areas
- `FormSelect` - Dropdown selects

## File Structure Notes

### Recent Customizations
- Homepage (`src/pages/index.astro`) uses business-focused components
- Component exports updated to include Solutions/Industries components
- Navigation configured for business sections
- Dark theme set as default throughout

### Integration Points
- Astro v4.15.9 with Lit components for interactivity
- MDX support for rich content pages
- Icon system using Iconify with Material Design and Outline icons
- Sitemap generation for SEO

The codebase maintains the Odyssey theme's component-driven architecture while adding business-specific functionality and a professional dark theme aesthetic.