import { useState, useCallback } from "react";
import { searchProducts } from "../services/productService";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (q, opts = {}) => {
    const term = (q ?? query).trim();
    if (!term) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchProducts(term, opts);
      const list = Array.isArray(data) ? data : data?.items ?? data?.results ?? [];
      setResults(list);
    } catch (err) {
      setError(err?.message ?? "Axtarış xətası");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return { query, setQuery, results, loading, error, search };
}
