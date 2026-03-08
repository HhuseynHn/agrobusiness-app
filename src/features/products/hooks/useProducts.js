import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../services/productService";
import { buildProductParams } from "../utils/filters";

const DEFAULT_LIMIT = 12;

export function useProducts(externalFilters = {}) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const params = buildProductParams({
        ...externalFilters,
        page: pageNum,
        limit: DEFAULT_LIMIT,
      });
      const data = await fetchProducts(params);
      const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? [];
      setItems((prev) => (append ? [...prev, ...list] : list));
      setHasMore(list.length >= DEFAULT_LIMIT);
      setPage(pageNum);
    } catch (err) {
      setError(err?.message ?? "Yükləmə xətası");
      setItems((prev) => (append ? prev : []));
    } finally {
      setLoading(false);
    }
  }, [externalFilters]);

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    loadPage(page + 1, true);
  }, [loading, hasMore, page, loadPage]);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => loadPage(1, false),
  };
}
