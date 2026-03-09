import { useState, useEffect } from "react";
import { fetchFarmers } from "../services/productService";
import { FarmerCard } from "./FarmerCard";

export function FarmersSection() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchFarmers()
      .then((data) => setFarmers(Array.isArray(data) ? data : data?.items ?? []))
      .catch(() => setFarmers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Birbaşa fermerlərdən</h2>
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-emerald-100" />
          ))}
        </div>
      ) : farmers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {farmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 py-12 text-center">
          <p className="text-emerald-600">Fermer tapılmadı.</p>
        </div>
      )}
    </section>
  );
}
