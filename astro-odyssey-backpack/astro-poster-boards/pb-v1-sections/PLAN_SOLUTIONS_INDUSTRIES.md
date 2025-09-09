# Solutions & Industries Expansion Plan

(Approved on request)

## 1. Goals
Add two new content sections: Solutions and Industries with MDX-based authoring like the Blog. Astro-only implementation. Clean routes:
- `/solutions` (listing)
- `/solutions/<slug>` (detail)
- `/industries` (listing)
- `/industries/<slug>` (detail)

## 2. Structure
```
src/pages/solutions/index.astro
src/pages/solutions/items/<solution>.mdx
src/pages/industries/index.astro
src/pages/industries/items/<industry>.mdx
src/layouts/Solution.astro
src/layouts/Industry.astro
src/components/solutions/{SolutionCard,SolutionsList}.astro
src/components/industries/{IndustryCard,IndustriesList}.astro
```

## 3. Frontmatter Schemas
Solution MDX:
```
---
layout: '../../../layouts/Solution.astro'
title: Pipeline Automation
description: Automate data integration tasks
publishDate: September 8, 2025
excerpt: Short teaser sentence.
featuredImage: '/assets/images/solutions/pipeline-automation/featured.jpg'
industries: ['Healthcare', 'Finance']
tags: ['Automation', 'Data']
status: 'active'
---
```
Industry MDX:
```
---
layout: '../../../layouts/Industry.astro'
title: Healthcare
description: Tech enabling providers & payers
publishDate: September 8, 2025
excerpt: Short teaser
featuredImage: '/assets/images/industries/healthcare/featured.jpg'
solutions: ['Pipeline Automation', 'Patient Analytics']
segments: ['Providers', 'Payers']
tags: ['Compliance']
---
```

## 4. Data Loading
Use `Astro.glob('./items/*.mdx')` in each index page, map to objects: `{title, description, excerpt, publishDate (parsed), featuredImage, href, industries/solutions, tags}`. Sort new → old.

## 5. Layouts
Clone `Post.astro` minus blog tag links. Add optional related sections rendering frontmatter arrays.

## 6. Components
Cards + Lists similar to blog list grid. Separate for clarity.

## 7. Navigation
Add to `src/config/nav.js` before Blog:
```
{ title: 'Solutions', slug: '/solutions' },
{ title: 'Industries', slug: '/industries' },
```

## 8. SEO
Per page SEO object. Index titles: `Solutions | Odyssey Theme`, `Industries | Odyssey Theme`.

## 9. Edge Cases
- Missing publishDate: place at end.
- Missing image: fallback placeholder.
- Empty list: show friendly message.
- Duplicate titles: rely on unique filenames (document expectation).

## 10. Phases
Phase 1 (MVP): Structure, example content, listing, layouts, nav.
Phase 2: Reverse relationship auto-generation, filters.
Phase 3: RSS, JSON-LD, search integration.

## 11. Acceptance Criteria
- Adding new MDX appears in listing automatically.
- Detail pages render with correct layout.
- Related arrays display if present.
- Navigation updated.
- Build passes.
- No React/Tailwind introduced.

## 12. Deferred Enhancements
- Auto reverse linking.
- Tag taxonomy reuse.
- Query param filters.
- Search indexing.

## 13. Risks & Mitigations
- Inconsistent naming → slug conflict; mitigate with file-based slugs.
- Large lists future performance → paginate later if needed.

## 14. Testing Strategy
Manual verification + adding second sample in each collection. Visual scan for layout integrity. Optionally Lighthouse quick check.
