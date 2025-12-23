export const normalizeCategory = (value: string): string =>
  value.toLowerCase().replace("fake:", "").trim();