import { parse, isBefore } from 'date-fns';

/**
 * Normalize an array of MDX glob results into a consistent listing structure.
 * @param {Array} entries - Raw results from Astro.glob
 * @param {Object} options
 * @param {string} [options.dateFormat='MMMM d, yyyy'] - Expected frontmatter date format
 * @param {Function} [options.mapExtra] - Optional mapper to add extra fields per entry
 */
export function normalizeContentEntries(entries, { dateFormat = 'MMMM d, yyyy', mapExtra } = {}) {
  return entries
    .map(({ frontmatter, url }) => {
      const publishDateRaw = frontmatter.publishDate;
      let publishDateParsed = null;
      if (publishDateRaw) {
        try {
          publishDateParsed = parse(publishDateRaw, dateFormat, new Date());
        } catch (e) {
          publishDateParsed = null;
        }
      }
      const base = {
        title: frontmatter.title,
        description: frontmatter.description,
        excerpt: frontmatter.excerpt,
        publishDate: publishDateParsed,
        featuredImage: frontmatter.featuredImage,
        href: url,
        tags: frontmatter.tags || [],
      };
      return mapExtra ? { ...base, ...mapExtra(frontmatter, url) } : base;
    })
    .sort((a, b) => {
      // Place entries without date at the end
      if (!a.publishDate && !b.publishDate) return 0;
      if (!a.publishDate) return 1;
      if (!b.publishDate) return -1;
      if (isBefore(a.publishDate, b.publishDate)) return 1;
      if (isBefore(b.publishDate, a.publishDate)) return -1;
      return 0;
    });
}
