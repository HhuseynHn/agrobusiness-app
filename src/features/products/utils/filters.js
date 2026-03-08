/**
 * Filter helpers for products (category, price range, rating, freshness, sort).
 */

export const SORT_OPTIONS = [
  { value: "newest", label: "Ən yeni" },
  { value: "price_asc", label: "Ən ucuz" },
  { value: "price_desc", label: "Ən bahalı" },
  { value: "bestsellers", label: "Ən çox satılan" },
];

export const FRESHNESS_OPTIONS = [
  { value: "this_week", label: "Bu həftə" },
  { value: "this_month", label: "Bu ay" },
];

export const DEFAULT_PRICE_RANGE = { min: 0, max: 500 };

export function buildProductParams(filters) {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.minPrice != null) params.minPrice = filters.minPrice;
  if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
  if (filters.rating != null) params.rating = filters.rating;
  if (filters.freshness) params.freshness = filters.freshness;
  if (filters.sort) params.sort = filters.sort;
  if (filters.page != null) params.page = filters.page;
  if (filters.limit != null) params.limit = filters.limit;
  if (filters.q) params.q = filters.q;
  return params;
}

export function clampPriceRange(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}
