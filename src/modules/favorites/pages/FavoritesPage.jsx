import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { selectFavorites, removeFavorite } from "../../../store/slices/favoriteSlice";
import { addToCart } from "../../../store/slices/cartSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { LazyImage } from "../../../components/LazyImage";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectFavorites);

  if (!items.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6">
        <Heart className="h-16 w-16 text-emerald-300" />
        <p className="text-lg text-emerald-700">Favorileriniz bosdur</p>
        <Link to="/">
          <Button>Mehsullara bax</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <h1 className="text-2xl font-bold text-emerald-900">Favoriler</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <Card key={p.id} className="overflow-hidden border-emerald-100 group">
            <Link to={"/product/" + p.id} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
                {p.images && p.images[0] ? (
                  <LazyImage
                    src={p.images[0]}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-emerald-400">
                    Sekil yoxdur
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-xs text-white">
                  {p.category || "Kateqoriya"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeFavorite(p.id));
                  }}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-red-500 hover:bg-white"
                  aria-label="Favorilerden cixar"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </Link>
            <div className="p-3">
              <p className="font-medium text-emerald-900 line-clamp-2">{p.name}</p>
              <p className="text-sm text-emerald-600">{p.farmerName}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-emerald-800">
                  {(p.price ?? 0).toFixed(2)} AZN
                </span>
                <span className="text-xs text-emerald-500">★ {p.rating ?? 0}</span>
              </div>
              <Button
                className="mt-2 w-full"
                size="sm"
                onClick={() => dispatch(addToCart({ product: p }))}
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                Sebete elave et
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
