import { useState, useEffect } from "react";
import { fetchCategories } from "../services/productService";

const FALLBACK_CATEGORIES = [
  { id: "meyveler", name: "Meyvələr", slug: "meyveler" },
  { id: "teravezler", name: "Tərəvəzlər", slug: "teravezler" },
  { id: "taxillar", name: "Taxıllar", slug: "taxillar" },
  { id: "sud", name: "Süd məhsulları", slug: "sud" },
  { id: "et", name: "Ət məhsulları", slug: "et" },
  { id: "toxumlar", name: "Toxumlar", slug: "toxumlar" },
];

export function useCategories() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCategories()
      .then((data) => {
        if (!cancelled) {
          const list = Array.isArray(data) ? data : data?.items ?? data ?? [];
          setCategories(list.length ? list : FALLBACK_CATEGORIES);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Kateqoriyalar yüklənə bilmədi");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
