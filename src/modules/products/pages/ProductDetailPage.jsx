import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Share2, Star } from "lucide-react";
import { fetchProductById, clearCurrentProduct, selectCurrentProduct, selectProductsLoading } from "../../../store/slices/productSlice";
import { addToCart } from "../../../store/slices/cartSlice";
import { toggleFavorite } from "../../../store/slices/favoriteSlice";
import { selectFavorites } from "../../../store/slices/favoriteSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { LazyImage } from "../../../components/LazyImage";
import { mockReviews } from "../../../mock/data";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const productFromState = location.state?.product;
  const productFromRedux = useSelector(selectCurrentProduct);
  const product = productFromState || productFromRedux;
  const loading = useSelector(selectProductsLoading);
  const favorites = useSelector(selectFavorites);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const isFavorite = product && favorites.some((f) => f.id === product.id);
  const reviews = product ? mockReviews.filter((r) => r.productId === product.id) : [];

  useEffect(() => {
    if (id && !productFromState) dispatch(fetchProductById(Number(id)));
    return () => dispatch(clearCurrentProduct());
  }, [id, dispatch, productFromState]);

  if (loading && !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-emerald-700">Məhsul tapılmadı</p>
        <Link to="/">
          <Button className="mt-4">Ana səhifə</Button>
        </Link>
      </div>
    );
  }

  const mainImage = product.images?.[0] ?? product.imageUrl;
  const rating = product.rating ?? 0;
  const productName = product.name ?? product.title;

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <div className="aspect-square overflow-hidden rounded-xl bg-emerald-50">
            {mainImage ? (
              <LazyImage
                src={mainImage}
                alt={productName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-emerald-400">
                Şəkil yoxdur
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-emerald-200"
                >
                  <LazyImage src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-600">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold text-emerald-900">{productName}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-5 w-5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-sm text-emerald-600">({product.reviewCount ?? 0} rəy)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-800">
              {(product.price ?? 0).toFixed(2)} ₼
            </span>
            {product.oldPrice != null && (
              <span className="text-lg text-gray-400 line-through">
                {(product.oldPrice ?? 0).toFixed(2)} ₼
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-emerald-700">Stok: {product.stock ?? 0} {product.unit}</p>
          {(product.farmerId || product.farmerName) && (
            <Link to={"/farmer/" + (product.farmerId || "")} className="mt-2 inline-block text-sm text-emerald-600 hover:underline">
              Fermer: {product.farmerName || "—"}
            </Link>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center rounded-lg border border-emerald-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-emerald-700 hover:bg-emerald-50"
              >
                −
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock ?? 99, q + 1))}
                className="px-3 py-2 text-emerald-700 hover:bg-emerald-50"
              >
                +
              </button>
            </div>
            <Button onClick={() => dispatch(addToCart({ product, quantity }))}>
              Səbətə əlavə et
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch(toggleFavorite(product))}
            >
              <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              Favorilərə
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-emerald-100">
        <div className="flex border-b border-emerald-100">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-emerald-600 text-emerald-800"
                  : "text-emerald-600 hover:text-emerald-800"
              }`}
            >
              {tab === "description" ? "Təsvir" : "Rəylər"}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === "description" && (
            <div>
              <p className="text-emerald-800">{product.description}</p>
              {product.nutritionalInfo && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-4">
                  <p className="font-medium text-emerald-800">Qida dəyəri</p>
                  <pre className="mt-1 text-sm text-emerald-700">
                    {JSON.stringify(product.nutritionalInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.length ? (
                reviews.map((r) => (
                  <div key={r.id} className="flex gap-3 border-b border-emerald-50 pb-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-200" />
                    <div>
                      <p className="font-medium text-emerald-800">{r.userName}</p>
                      <p className="text-sm text-emerald-700">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                      <p className="mt-1 text-emerald-700">{r.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-emerald-600">Hələ rəy yoxdur.</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
