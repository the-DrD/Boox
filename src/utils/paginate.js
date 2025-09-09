export function paginate(items, pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  return {
    totalPages,
    slice(page) {
      const pageNum = Math.min(Math.max(1, page), totalPages);
      const start = (pageNum - 1) * pageSize;
      return items.slice(start, start + pageSize);
    },
  };
}
