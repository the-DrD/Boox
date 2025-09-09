# AGENTS.md - Odyssey Theme Development Guide

## Commands
- `npm run dev` - Start dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run format` - Format code with Prettier (no lint/test commands configured)

## Code Style
- **Prettier**: Tabs, single quotes, semicolons required, arrow functions without parens for single params
- **Naming**: Components (PascalCase), files (kebab-case), CSS classes (BEM: `feature-card__section`)
- **Imports**: Use path aliases (`@components/*`, `@layouts/*`, etc.), barrel exports from `odyssey-theme.js`

## Architecture
- **Framework**: Astro v4.15.9 + TypeScript + MDX
- **Styling**: CSS custom properties in `src/styles/theme.css`
- **Config**: Centralized in `src/config/` (settings, nav, footer)
- **Components**: Functional grouping (core, sections, forms, blog)
- **Layouts**: Base → Page → Post hierarchy

## Key Patterns
- Import Astro components with `.astro` extension
- Use `astro-icon` with `Icon` component for icons
- Theme switching via CSS custom properties
- Mobile-first responsive design
- No testing framework configured