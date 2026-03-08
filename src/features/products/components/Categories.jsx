import { useNavigate } from "react-router-dom";
import { Apple, Carrot, Wheat, Milk, Beef, Sprout } from "lucide-react";
import { useCategories } from "../hooks/useCategories";

const ICON_MAP = {
  meyveler: Apple,
  teravezler: Carrot,
  taxillar: Wheat,
  sud: Milk,
  et: Beef,
  toxumlar: Sprout,
};

function CategoryCard({ category, onClick }) {
  const slug = category.slug || category.id || "";
  const Icon = ICON_MAP[slug] || Sprout;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-emerald-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
        <Icon className="h-7 w-7" />
      </div>
      <span className="relative text-sm font-medium text-emerald-900">
        {category.name}
      </span>
    </button>
  );
}

export function Categories({ onSelectCategory }) {
  const { categories } = useCategories();
  const navigate = useNavigate();

  function handleSelect(category) {
    const slug = category.slug || category.id;
    onSelectCategory?.(slug);
    navigate("/");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Kateqoriyalar</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id || cat.slug}
            category={cat}
            onClick={() => handleSelect(cat)}
          />
        ))}
      </div>
    </section>
  );
}
