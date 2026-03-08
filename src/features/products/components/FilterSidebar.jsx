import { memo } from "react";
import { useCategories } from "../hooks/useCategories";
import { SORT_OPTIONS, FRESHNESS_OPTIONS } from "../utils/filters";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { RatingFilter } from "./RatingFilter";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";

function FilterSidebarInner({
  filters,
  onFiltersChange,
  onClear,
  className = "",
}) {
  const { categories } = useCategories();
  const {
    category,
    minPrice,
    maxPrice,
    rating,
    freshness,
    sort,
  } = filters;

  function update(partial) {
    onFiltersChange({ ...filters, ...partial });
  }

  return (
    <aside className={`space-y-6 rounded-xl border border-emerald-100 bg-white p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-emerald-900">Filterlər</h3>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Təmizlə
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-emerald-800">Kateqoriya</Label>
        <div className="space-y-1">
          {categories.map((c) => (
            <label key={c.id || c.slug} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={category === (c.slug || c.id)}
                onChange={() => update({ category: category === (c.slug || c.id) ? null : (c.slug || c.id) })}
                className="h-4 w-4 rounded border-emerald-300 text-emerald-600"
              />
              <span className="text-sm text-emerald-800">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-emerald-800">Qiymət aralığı</Label>
        <PriceRangeSlider
          min={0}
          max={500}
          valueMin={minPrice ?? 0}
          valueMax={maxPrice ?? 500}
          onChange={(min, max) => update({ minPrice: min, maxPrice: max })}
        />
      </div>

      <div className="space-y-2">
        <RatingFilter value={rating} onChange={(v) => update({ rating: v })} />
      </div>

      <div className="space-y-2">
        <Label className="text-emerald-800">Təzəlik</Label>
        <select
          value={freshness || ""}
          onChange={(e) => update({ freshness: e.target.value || null })}
          className="w-full rounded-md border border-emerald-200 px-3 py-2 text-sm text-emerald-800"
        >
          <option value="">Hamısı</option>
          {FRESHNESS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-emerald-800">Sırala</Label>
        <select
          value={sort || ""}
          onChange={(e) => update({ sort: e.target.value || null })}
          className="w-full rounded-md border border-emerald-200 px-3 py-2 text-sm text-emerald-800"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export const FilterSidebar = memo(FilterSidebarInner);
