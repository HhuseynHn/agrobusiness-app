import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { useCartFavorites } from "../../../context/CartFavoritesContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function QuickViewModal({ open, product, onClose }) {
  const { addToCart } = useCartFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  function handleAddToCart() {
    if (!isAuthenticated) {
      navigate("/login");
      onClose();
      return;
    }
    addToCart(product);
    onClose();
  }

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-emerald-600 hover:bg-emerald-50"
          aria-label="Bağla"
        >
          <X className="h-5 w-5" />
        </button>
        <DialogHeader>
          <DialogTitle className="pr-8">{product.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-emerald-50">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-emerald-400">
                Şəkil yoxdur
              </div>
            )}
          </div>
          <p className="text-sm text-emerald-700">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-emerald-900">
              {product.price != null ? `${Number(product.price).toLocaleString("az-AZ")} ₼` : "—"}
            </span>
            {product.oldPrice != null && (
              <span className="text-sm text-gray-400 line-through">
                {Number(product.oldPrice).toLocaleString("az-AZ")} ₼
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddToCart}>Səbətə əlavə et</Button>
          <Button variant="outline" onClick={onClose}>
            Bağla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
