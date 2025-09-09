# Astro Odyssey Theme - Project Structure Documentation

## 📁 Project Overview

This document provides a comprehensive guide to the Astro Odyssey Theme project structure, with cross-references and navigation paths for developers.

## 🗂️ Root Directory Structure

```
.
├── 📄 astro.config.mjs          # Astro configuration and integrations
├── 📄 package.json              # Dependencies and scripts
├── 📄 tsconfig.json            # TypeScript configuration with path mapping
├── 📄 README.md                 # Project overview and usage instructions
├── 📄 CLAUDE.md                # Claude Code development guidance
├── 📄 PROJECT_STRUCTURE.md     # This documentation file
├── 📁 src/                     # Source code directory
├── 📁 public/                  # Static assets served directly
└── 📁 dist/                    # Build output directory (generated)
```

## 🏗️ Source Directory (`src/`) - Detailed Structure

### Configuration Layer (`src/config/`)
Centralized configuration system for site-wide settings.

```
src/config/
├── 📄 settings.js    # Global site settings and theme options
├── 📄 nav.js         # Main navigation menu structure
└── 📄 footer.js      # Footer content and social media links
```

**Cross-References:**
- Used by: [`src/layouts/Base.astro`](#base-layout), [`src/components/core/Header.astro`](#header-component)
- Import pattern: `import settings from '@config/settings'`

### Layout System (`src/layouts/`)
Template hierarchy for page structure.

```
src/layouts/
├── 📄 Base.astro     # Core HTML structure, meta tags, CSS imports
├── 📄 Page.astro     # Standard page with header/footer
└── 📄 Post.astro     # Blog post layout with enhanced metadata
```

**Layout Hierarchy:**
```
Base.astro
├── Page.astro (extends Base)
│   ├── Used by: All standard pages
│   └── Includes: Header, Footer, main content area
└── Post.astro (extends Base)
    ├── Used by: Blog posts in src/pages/blog/posts/
    └── Includes: Post metadata, enhanced SEO, structured data
```

**Cross-References:**
- Base layout imported by: All other layouts
- Page layout used by: [`src/pages/index.astro`](#homepage), [`src/pages/company/`](#company-pages)
- Post layout used by: All `.mdx` files in [`src/pages/blog/posts/`](#blog-posts)

### Component Library (`src/components/`)
Organized component system with clear separation of concerns.

#### Core Components (`src/components/core/`)
Foundation components used across the site.

```
src/components/core/
├── 📄 Container.astro           # Layout wrapper with width constraints
├── 📄 Header.astro             # Site navigation and branding
├── 📄 Footer.astro             # Site footer with links and social
├── 📄 Navigation.astro         # Main navigation menu
├── 📄 MobileMenuToggle.astro   # Mobile menu functionality
├── 📄 MobileMenuOverlay.astro  # Mobile menu overlay
├── 📄 SkipLink.astro          # Accessibility skip navigation
└── 📄 SocialLink.astro        # Social media link component
```

**Cross-References:**
- Container: Used by all section components
- Header: Included in [`src/layouts/Page.astro`](#page-layout)
- Footer: Included in [`src/layouts/Page.astro`](#page-layout)
- Navigation: Uses [`src/config/nav.js`](#navigation-config)

#### Section Components (`src/components/sections/`)
Composed page sections built from core components.

```
src/components/sections/
├── 📄 TextSection.astro              # Basic text content section
├── 📄 HeroSection.astro             # Hero section with CTA
├── 📄 HomeHeroSection.astro         # Homepage-specific hero
├── 📄 TextAndImageHero.astro        # Hero with image
├── 📄 ThreeColumnTextSection.astro  # Multi-column layout
├── 📄 StickyTextImageSection.astro  # Sticky scroll section
├── 📄 CustomerQuoteSection.astro    # Testimonial section
├── 📄 CtaCardSection.astro         # Call-to-action cards
└── 📄 YouTubeEmbed.astro           # Video embedding
```

**Usage Patterns:**
- All sections use [`Container.astro`](#container-component) for consistent layout
- Used in: [`src/pages/index.astro`](#homepage), [`src/pages/landing-pages/`](#landing-pages)
- Props: Most accept `narrow` boolean for layout variants

#### Form Components
Split between form fields and complete forms.

```
src/components/
├── form-fields/
│   ├── 📄 Input.astro         # Text input field
│   ├── 📄 Select.astro        # Dropdown select field
│   ├── 📄 Textarea.astro      # Multi-line text input
│   └── 📄 Checkbox.astro      # Checkbox input
└── forms/
    ├── 📄 ContactForm.astro       # Complete contact form
    ├── 📄 NewsletterForm.astro    # Email signup form
    └── 📄 LandingPageForm.astro   # Lead generation form
```

**Cross-References:**
- Form fields: Used by complete forms in `src/components/forms/`
- Contact form: Used in [`src/pages/company/contact.astro`](#contact-page)
- Newsletter form: Used in footer and landing pages

#### UI Components
Reusable interface elements.

```
src/components/
├── buttons/
│   └── 📄 Button.astro        # Styled button with variants
├── cards/
│   └── 📄 FeatureCard.astro   # Product/service feature cards
├── blog/
│   ├── 📄 BlogPostsList.astro    # Blog post listing
│   ├── 📄 BlogPostPreview.astro  # Individual post preview
│   └── 📄 BlogPost.astro        # Full blog post component
└── theme-switcher/
    ├── 📄 ThemeSwitcher.astro    # Theme selection interface
    └── 📄 theme-switcher.lit.js  # Lit component for interactivity
```

#### Special Components

```
src/components/
├── 📄 Logo.astro              # Site logo/branding
├── 📄 odyssey-theme.js        # Component exports for external use
└── head/
    └── 📄 SEO.astro          # SEO meta tags component
```

**Cross-References:**
- SEO component: Used in [`src/layouts/Base.astro`](#base-layout)
- odyssey-theme.js: Exports for MDX usage in blog posts

### Page Structure (`src/pages/`)
File-based routing with organized content.

#### Homepage and Core Pages
```
src/pages/
├── 📄 index.astro           # Homepage with hero and sections
├── 📄 404.astro            # Custom 404 error page
└── 📄 [fallback routes]    # Astro dynamic routing
```

#### Company Pages (`src/pages/company/`)
```
src/pages/company/
├── 📄 about.astro          # About page
├── 📄 contact.astro        # Contact form page
└── 📄 legal.astro         # Legal/terms page
```

**Cross-References:**
- About page: Uses [`TextSection`](#text-section) components
- Contact page: Uses [`ContactForm`](#contact-form) component
- Navigation: Defined in [`src/config/nav.js`](#navigation-config)

#### Blog System (`src/pages/blog/`)
Complete blog functionality with tagging.

```
src/pages/blog/
├── 📄 index.astro          # Blog listing page
├── posts/
│   ├── 📄 post-1.mdx       # Individual blog posts (MDX format)
│   ├── 📄 post-2.mdx       # With frontmatter metadata
│   └── 📄 [more-posts].mdx
└── tags/
    ├── 📄 index.astro      # All tags listing
    └── 📄 [slug].astro     # Dynamic tag pages
```

**Blog Architecture:**
- Posts use [`src/layouts/Post.astro`](#post-layout)
- Listing uses [`BlogPostsList.astro`](#blog-list-component)
- Tags are automatically generated from frontmatter
- MDX allows component embedding in posts

#### Landing Pages (`src/pages/landing-pages/`)
Marketing and conversion pages.

```
src/pages/landing-pages/
├── 📄 landing-1.astro      # Product landing page
├── 📄 landing-2.astro      # Service landing page
└── 📄 landing-3.astro      # Event landing page
```

**Cross-References:**
- Use hero sections from [`src/components/sections/`](#section-components)
- Include forms from [`src/components/forms/`](#form-components)

#### Theme Documentation (`src/pages/theme/`)
Documentation and examples for theme usage.

```
src/pages/theme/
├── 📄 theme-setup.mdx          # Setup instructions
├── 📄 customizing-odyssey.mdx  # Customization guide
├── 📄 style-guide.astro        # Visual style examples
└── 📄 get-started.astro        # Quick start guide
```

### Styling System (`src/styles/`)
Organized CSS architecture with theming support.

```
src/styles/
├── 📄 index.css        # Main stylesheet (imports all others)
├── 📄 reset.css        # Browser normalization
├── 📄 global.css       # Global styles and utilities
├── 📄 theme.css        # CSS custom properties for theming
└── 📄 typography.css   # Typography scale and styles
```

**CSS Import Hierarchy:**
```css
index.css
├── imports reset.css
├── imports theme.css
├── imports typography.css
└── imports global.css
```

**Cross-References:**
- index.css: Imported in [`src/layouts/Base.astro`](#base-layout)
- theme.css: Variables used throughout all components
- Custom properties: Available for component customization

### Utilities and Configuration (`src/utils/`, `src/icons/`)
```
src/
├── utils/
│   └── 📄 all.js           # Utility functions
├── icons/
│   └── 📄 [icon-files]     # Custom SVG icons
└── 📄 env.d.ts             # TypeScript environment declarations
```

## 🔗 Cross-Reference Map

### Configuration Dependencies
```
src/config/settings.js
├── Used by: src/layouts/Base.astro (site title, description)
├── Used by: src/components/core/Header.astro (theme switcher)
└── Used by: src/components/theme-switcher/ (theme options)

src/config/nav.js
├── Used by: src/components/core/Navigation.astro
└── Used by: src/components/core/MobileMenuOverlay.astro

src/config/footer.js
└── Used by: src/components/core/Footer.astro
```

### Layout Dependencies
```
src/layouts/Base.astro
├── Imports: src/config/settings.js
├── Imports: src/styles/index.css
├── Uses: src/components/head/SEO.astro
└── Extended by: Page.astro, Post.astro

src/layouts/Page.astro
├── Extends: Base.astro
├── Uses: src/components/core/Header.astro
├── Uses: src/components/core/Footer.astro
└── Used by: Most pages in src/pages/

src/layouts/Post.astro
├── Extends: Base.astro
├── Enhanced metadata for blog posts
└── Used by: All .mdx files in src/pages/blog/posts/
```

### Component Dependencies
```
src/components/core/Container.astro
└── Used by: Almost all section components

src/components/sections/*.astro
├── Import: Container.astro
├── Used by: Landing pages, homepage
└── Accept: narrow prop for layout variants

src/components/forms/ContactForm.astro
├── Uses: form-fields/*.astro
└── Used by: src/pages/company/contact.astro
```

## 🧭 Navigation Patterns

### TypeScript Path Mapping
Configure in `tsconfig.json`:
```json
{
  "paths": {
    "@config": ["config/*"],
    "@components/*": ["components/*"],
    "@layouts/*": ["layouts/*"],
    "@styles/*": ["styles/*"]
  }
}
```

### Import Patterns
```astro
// Configuration imports
import settings from '@config/settings';
import { nav } from '@config/nav.js';

// Component imports
import Layout from '@layouts/Page.astro';
import Container from '@components/core/Container.astro';
import Button from '@components/buttons/Button.astro';

// Style imports
import '@styles/index.css';
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `TextSection.astro`)
- **Pages**: kebab-case (e.g., `landing-pages/`)
- **Config**: camelCase (e.g., `settings.js`)
- **Styles**: kebab-case (e.g., `theme.css`)

## 📚 Development Workflow Patterns

### Adding New Components
1. Create in appropriate `src/components/[category]/`
2. Follow existing prop patterns
3. Use `Container.astro` for layout consistency
4. Export in `odyssey-theme.js` if needed for MDX

### Adding New Pages
1. Create in `src/pages/` with appropriate structure
2. Use `Page.astro` layout for standard pages
3. Import required components from `@components/*`
4. Update navigation in `src/config/nav.js` if needed

### Customizing Themes
1. Modify CSS custom properties in `src/styles/theme.css`
2. Add new theme variants following existing patterns
3. Update theme switcher if adding new themes
4. Test across all components and pages

This structure documentation provides a comprehensive map for navigating and understanding the Astro Odyssey Theme codebase, with clear cross-references and development patterns.