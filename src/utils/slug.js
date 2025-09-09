/**
 * Create a URL-safe slug from an arbitrary string.
 * - Normalizes unicode & removes diacritics (accents)
 * - Lowercases
 * - Replaces any run of non-alphanumeric characters with single hyphen
 * - Trims leading/trailing hyphens
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  if (value == null) return '';
  return value
    .toString()
    // Normalize & strip accents
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .toLowerCase()
    .trim()
    // Replace non-alphanumeric with hyphen
    .replace(/[^a-z0-9]+/g, '-')
    // Trim hyphens
    .replace(/^-+|-+$/g, '');
}
