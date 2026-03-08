import { useCartFavorites } from "../../../context/CartFavoritesContext";
import { ProductCard } from "./ProductCard";

export function RecentViewedSlider() {
  const { recentViewed } = useCartFavorites();

  if (recentViewed.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Son baxılanlar</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recentViewed.map((product) => (
          <div key={product.id} className="w-64 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
