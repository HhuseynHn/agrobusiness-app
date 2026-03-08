import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { fetchFarmers } from "../services/productService";
import { Button } from "../../../components/ui/button";

const FALLBACK_FARMERS = [
  { id: 1, name: "Fermer 1", location: "Gəncə", productCount: 24, rating: 4.8 },
  { id: 2, name: "Fermer 2", location: "Şəki", productCount: 18, rating: 4.5 },
  { id: 3, name: "Fermer 3", location: "Lənkəran", productCount: 31, rating: 4.9 },
];

export function FarmersSection() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState(FALLBACK_FARMERS);

  useEffect(() => {
    fetchFarmers()
      .then((data) => setFarmers(Array.isArray(data) ? data : data?.items ?? FALLBACK_FARMERS))
      .catch(() => {});
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Birbaşa fermerlərdən</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {farmers.slice(0, 3).map((farmer) => (
          <div
            key={farmer.id}
            className="flex flex-col items-center rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700">
              {farmer.name?.charAt(0) || "F"}
            </div>
            <h3 className="mt-3 font-semibold text-emerald-900">{farmer.name}</h3>
            <p className="text-sm text-emerald-600">{farmer.location}</p>
            <p className="mt-1 text-xs text-emerald-500">
              {farmer.productCount ?? 0} məhsul
            </p>
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-emerald-800">
                {farmer.rating ?? "—"}
              </span>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Bütün məhsulları
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
