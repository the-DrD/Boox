# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Odyssey Theme, a modern Astro-based marketing website theme designed for startups and businesses. It's a fully-featured theme with landing pages, blog functionality, contact forms, and comprehensive theming system.

## Development Commands

```bash
npm install        # Install dependencies
npm start          # Start development server (alias for npm run dev)
npm run dev        # Start development server at localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview production build locally
npm run format     # Format code with Prettier
```

## Technology Stack

- **Framework**: Astro v4.15.9 with TypeScript
- **Integrations**: MDX, Lit components, Sitemap, Icon system
- **Styling**: CSS custom properties with comprehensive theming system
- **Icons**: Astro Icon with Iconify JSON packages (@iconify-json/ic, @iconify-json/mdi)

## Architecture & Structure

### Configuration System
The theme uses a centralized configuration approach:
- `src/config/settings.js` - Global site settings, theme switcher control
- `src/config/nav.js` - Main navigation structure
- `src/config/footer.js` - Footer configuration
- `astro.config.mjs` - Astro integrations and site URL configuration

### Component Architecture
Components are organized by functional category:
- `src/components/core/` - Essential layout components (Header, Footer, Navigation)
- `src/components/sections/` - Page section components
- `src/components/blog/` - Blog-specific components
- `src/components/forms/` - Contact forms and form fields
- `src/components/buttons/` - Button variations
- `src/components/cards/` - Card component variants
- `src/components/theme-switcher/` - Theme switching functionality

### Layout System
Three primary layouts in `src/layouts/`:
- `Base.astro` - Core HTML structure and meta tags
- `Page.astro` - Standard page layout with navigation/footer
- `Post.astro` - Blog post layout with enhanced meta and structure

### TypeScript Configuration
Uses path mapping for clean imports:
- `@config` → `src/config/*`
- `@components` → `src/components/*`
- `@layouts` → `src/layouts/*`
- `@styles` → `src/styles/*`
- `@utils` → `src/utils/*`
- `@icons` → `src/icons/*`

### Theming System
The theme includes a comprehensive CSS custom property system:
- `src/styles/theme.css` - CSS custom properties for colors, spacing, typography
- `src/styles/global.css` - Global styles and component base styles
- Theme switcher component allows runtime theme changes
- Fully customizable design tokens

### Page Structure
- File-based routing through `src/pages/`
- Blog functionality with MDX support
- Landing page examples
- Company pages (about, contact)
- Theme demonstration pages

## Key Features

- **Blog System**: Full-featured blog with MDX support and tagging
- **Contact Forms**: Pre-configured for Netlify, Formspree, Formspark
- **Theme Switching**: Runtime theme switching with CSS custom properties
- **SEO Optimized**: Open Graph, canonical URLs, sitemap generation
- **Performance**: Optimized for Lighthouse perfect scores
- **Responsive Design**: Mobile-first responsive layouts

## Development Notes

- The theme is designed to be easily customizable through the configuration files
- Icon system uses Astro Icon with Iconify for scalable icon management
- CSS architecture supports easy theme customization without touching component files
- MDX integration allows for rich content in blog posts
- Lit components provide enhanced interactivity where needed