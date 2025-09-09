# Development Commands
- `npm run dev` - Start dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

# Code Style
- **Formatting**: Tabs, single quotes, semicolons required, arrow functions without parens for single params
- **Components**: PascalCase (e.g., `SolutionsList.astro`)
- **Files**: kebab-case (e.g., `solution-card.astro`)
- **CSS Classes**: BEM notation (e.g., `feature-card__section`)
- **Imports**: Use path aliases from `@components/odyssey-theme` barrel export
- **Paths**: TypeScript aliases (`@config/*`, `@components/*`, `@layouts/*`, etc.)

# Architecture
- **Framework**: Astro v4.15.9 + TypeScript + MDX + Lit components
- **Styling**: CSS custom properties in `src/styles/theme.css`
- **Theme**: Dark theme default, theme switcher disabled
- **Components**: Functional grouping (core, sections, forms, blog, solutions, industries)
- **No lint/test commands configured** - only format and build commands available