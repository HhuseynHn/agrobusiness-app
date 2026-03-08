import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function ProductFilters({ onChange }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  function applyFilters() {
    onChange({
      category: category || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      rating: rating ? Number(rating) : undefined,
    });
  }

  function resetFilters() {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    onChange({});
  }

  return (
    <div className="space-y-4 rounded-xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-emerald-900">Filterlər</h3>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="category">Kateqoriya</Label>
          <Input
            id="category"
            placeholder="Məs: Tərəvəz, Süd məhsulları"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="minPrice">Min qiymət</Label>
            <Input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="maxPrice">Maks qiymət</Label>
            <Input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rating">Minimum rating</Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button className="flex-1" onClick={applyFilters}>
            Tətbiq et
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Sıfırla
          </Button>
        </div>
      </div>
    </div>
  );
}

