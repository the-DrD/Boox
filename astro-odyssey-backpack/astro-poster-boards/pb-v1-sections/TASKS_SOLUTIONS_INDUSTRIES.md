# Tasks: Solutions & Industries Implementation

## Phase 0: Prep
- [ ] Ensure branch `feature/solutions-industries-section` active (created)
- [ ] Add placeholder images if needed

## Phase 1: Structure & Example Content
- [ ] Create dirs: `src/pages/solutions/items/`, `src/pages/industries/items/`
- [ ] Add example: `pipeline-automation.mdx`
- [ ] Add example: `healthcare.mdx`

## Phase 2: Layouts
- [ ] Create `src/layouts/Solution.astro`
- [ ] Create `src/layouts/Industry.astro`
- [ ] Mirror `Post.astro` minus blog tags; add related sections placeholders

## Phase 3: Components
- [ ] `components/solutions/SolutionCard.astro`
- [ ] `components/solutions/SolutionsList.astro`
- [ ] `components/industries/IndustryCard.astro`
- [ ] `components/industries/IndustriesList.astro`

## Phase 4: Index Pages
- [ ] `pages/solutions/index.astro` glob + map + sort + list
- [ ] `pages/industries/index.astro` glob + map + sort + list

## Phase 5: Navigation
- [ ] Update `src/config/nav.js`
- [ ] Verify header renders new links

## Phase 6: Related Data (MVP)
- [ ] Render frontmatter `industries` on Solution detail if present
- [ ] Render frontmatter `solutions` on Industry detail if present

## Phase 7: SEO & Metadata
- [ ] Add SEO objects to index pages
- [ ] Add SEO object generation to new layouts

## Phase 8: Fallbacks & Edge Cases
- [ ] Handle missing publishDate (push to end)
- [ ] Placeholder image logic
- [ ] Empty collection messages

## Phase 9: QA
- [ ] Add 2nd solution MDX
- [ ] Add 2nd industry MDX
- [ ] Manual verify routes & nav
- [ ] Build passes (`pnpm build`)

## Phase 10: (Deferred Enhancements)
- [ ] Reverse relationship auto-building
- [ ] Filters (query params)
- [ ] RSS / JSON-LD / Search integration

## Completion Checklist
- [ ] All acceptance criteria met
- [ ] No console errors
- [ ] No unused imports
- [ ] No React/Tailwind introduced
- [ ] Branch ready for PR
