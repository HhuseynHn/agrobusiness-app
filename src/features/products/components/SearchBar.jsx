import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useCategories } from "../hooks/useCategories";

export function SearchBar({ value, onChange, categoryValue, onCategoryChange, placeholder }) {
  const { categories } = useCategories();
  const p = placeholder || "Axtarış...";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={p}
          className="pl-9"
          autoComplete="off"
        />
      </div>
      <select
        value={categoryValue || ""}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="h-10 rounded-md border border-emerald-200 bg-white px-3 text-sm text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Bütün kateqoriyalar</option>
        {categories.map((c) => (
          <option key={c.id || c.slug} value={c.slug || c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
