import { useRef } from "react";
import { ProductCard } from "./ProductCard";

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-emerald-100" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-3 w-20 animate-pulse rounded bg-emerald-100" />
        <div className="h-4 flex-1 animate-pulse rounded bg-emerald-100" />
        <div className="h-4 w-24 animate-pulse rounded bg-emerald-100" />
        <div className="mt-2 h-9 w-full animate-pulse rounded bg-emerald-100" />
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading, hasMore, onLoadMore }) {
  const sentinelRef = useRef(null);

  return (
    <section id="products-grid" className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-emerald-700">Məhsul tapılmadı.</p>
          <p className="mt-1 text-sm text-emerald-500">Filterləri dəyişin və ya daha sonra yenidən cəhd edin.</p>
        </div>
      )}
      {hasMore && products.length > 0 && (
        <div ref={sentinelRef} className="mt-8 flex justify-center">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoadMore}
              className="rounded-lg border border-emerald-600 px-6 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              Daha çox yüklə
            </button>
          )}
        </div>
      )}
    </section>
  );
}
