import { useState, useCallback, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Categories } from "../components/Categories";
import { FilterSidebar } from "../components/FilterSidebar";
import { ProductGrid } from "../components/ProductGrid";
import { FeaturedSlider } from "../components/FeaturedSlider";
import { DailyOfferBanner } from "../components/DailyOfferBanner";
import { BestsellersSlider } from "../components/BestsellersSlider";
import { FarmersSection } from "../components/FarmersSection";
import { BlogSection } from "../components/BlogSection";
import { RecentViewedSlider } from "../components/RecentViewedSlider";
import { CartToast } from "../components/CartToast";
import { useProducts } from "../hooks/useProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { PageHelmet } from "../../../components/PageHelmet";

const DEFAULT_FILTERS = {
  category: null,
  minPrice: null,
  maxPrice: null,
  rating: null,
  freshness: null,
  sort: null,
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      q: debouncedSearch || undefined,
      category: categoryFilter ?? filters.category,
    }),
    [filters, debouncedSearch, categoryFilter]
  );

  const { items, loading, hasMore, loadMore } = useProducts(effectiveFilters);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCategoryFilter(null);
    setSearch("");
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-emerald-900">
      <PageHelmet
        title="Ana səhifə"
        description="AgroBiznes məhsul kataloqu, filter və səbət."
      />
      <Header
        searchValue={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter ?? filters.category}
        onCategoryChange={(v) => {
          setCategoryFilter(v);
          setFilters((prev) => ({ ...prev, category: v }));
        }}
      />

      <main>
        <HeroSection />
        <DailyOfferBanner />
        <Categories
          onSelectCategory={(slug) => {
            setCategoryFilter(slug);
            setFilters((prev) => ({ ...prev, category: slug }));
          }}
        />
        <FeaturedSlider />

        <div className="flex gap-6">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between px-4 py-2 lg:px-0">
              <h2 className="text-lg font-semibold text-emerald-900">Məhsullar</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>
            </div>
            <ProductGrid
              products={items}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </div>
        </div>

        <BestsellersSlider />
        <FarmersSection />
        <BlogSection />
        <RecentViewedSlider />
      </main>

      <Footer />
      <CartToast />

      <Dialog open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filterlər</DialogTitle>
          </DialogHeader>
          <FilterSidebar
            filters={filters}
            onFiltersChange={(f) => {
              handleFiltersChange(f);
            }}
            onClear={() => {
              handleClearFilters();
              setMobileFilterOpen(false);
            }}
          />
          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="mt-4 w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Tətbiq et
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
