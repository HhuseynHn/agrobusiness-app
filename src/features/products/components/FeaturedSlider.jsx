import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchFeatured } from "../services/productService";
import { ProductCard } from "./ProductCard";

export function FeaturedSlider() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured()
      .then((data) => setItems(Array.isArray(data) ? data : data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Xüsusi təkliflər</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
        {items.map((product) => (
          <div key={product.id} className="w-64 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
