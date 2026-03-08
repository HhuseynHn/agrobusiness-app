import { useState, memo } from "react";
import { Heart, Eye, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCartFavorites } from "../../../context/CartFavoritesContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { QuickViewModal } from "./QuickViewModal";
import { LazyImage } from "../../../components/LazyImage";

function ProductCardInner({ product, onQuickView }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, toggleFavorite, isFavorite, addRecentViewed } = useCartFavorites();
  const [showQuickView, setShowQuickView] = useState(false);

  const rating = product.rating ?? 0;
  const isNew = product.isNew ?? product.isNewProduct;

  function handleAddToCart(e) {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(product);
  }

  function handleFavorite(e) {
    e.stopPropagation();
    toggleFavorite(product);
  }

  function handleQuickView(e) {
    e.stopPropagation();
    addRecentViewed(product);
    if (onQuickView) onQuickView(product);
    else setShowQuickView(true);
  }

  const title = product.title ?? product.name;
  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <Link to={"/product/" + product.id} state={{ product }} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
          {(product.imageUrl || product.images?.[0]) ? (
            <LazyImage
              src={product.imageUrl || product.images?.[0]}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-emerald-400">
              Şəkil yoxdur
            </div>
          )}
          {isNew && (
            <span className="absolute left-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
              Təzə
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="absolute right-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              -{product.discountPercent}%
            </span>
          )}
          <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={handleQuickView}
              className="rounded-full bg-white/90 p-2 text-emerald-700 shadow hover:bg-white"
              aria-label="Sürətli baxış"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleFavorite}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-400 hover:bg-white hover:text-red-500"
            aria-label="Favorilər"
          >
            <Heart
              className={`h-4 w-4 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <span className="text-xs font-medium text-emerald-600">
            {product.category || "Kateqoriya"}
          </span>
          <h3 className="line-clamp-2 flex-1 text-sm font-semibold text-emerald-900">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                />
              ))}
            </div>
            {product.reviewCount != null && (
              <span className="text-xs text-emerald-600">({product.reviewCount})</span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-emerald-800">
              {product.price != null ? `${Number(product.price).toLocaleString("az-AZ")} ₼` : "—"}
            </span>
            {product.oldPrice != null && (
              <span className="text-xs text-gray-400 line-through">
                {Number(product.oldPrice).toLocaleString("az-AZ")} ₼
              </span>
            )}
          </div>
        </div>
        </Link>
        <div className="p-3 pt-0">
          <Button
            variant="default"
            className="mt-auto w-full text-sm"
            onClick={handleAddToCart}
          >
            Səbətə əlavə et
          </Button>
        </div>
      </div>

      <QuickViewModal
        open={showQuickView}
        product={product}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}

export const ProductCard = memo(ProductCardInner);
