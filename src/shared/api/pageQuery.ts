export function pageQuery(page = 0, size = 100, sort?: string) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  if (sort) {
    params.set("sort", sort);
  }
  return params.toString();
}
