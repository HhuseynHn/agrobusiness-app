import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  removeFromCart,
  setQuantity,
} from "../../../store/slices/cartSlice";
import { addFavorite } from "../../../store/slices/favoriteSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { LazyImage } from "../../../components/LazyImage";

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Adi (3-5 gün)", price: 0 },
  { id: "express", label: "Təcili (1 gün)", price: 5 },
];

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [delivery, setDelivery] = useState("standard");
  const deliveryFee = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const total = subtotal + deliveryFee;

  if (!items.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6">
        <p className="text-lg text-emerald-700">Səbətiniz boşdur</p>
        <Link to="/">
          <Button>Məhsullara keçid</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <h1 className="text-2xl font-bold text-emerald-900">Səbət</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const p = item.product;
            const qty = item.quantity || 1;
            const lineTotal = (p?.price ?? 0) * qty;
            return (
              <Card key={item.productId} className="flex gap-4 p-4 border-emerald-100">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
                  {p?.images?.[0] ? (
                    <LazyImage src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-emerald-400 text-xs">
                      Şəkil
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-emerald-900">{p?.name}</p>
                  <p className="text-sm text-emerald-600">{p?.farmerName}</p>
                  <p className="mt-1 font-semibold text-emerald-800">
                    {(p?.price ?? 0).toFixed(2)} ₼
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => dispatch(setQuantity({ productId: p.id, quantity: qty - 1 }))}
                      className="rounded border border-emerald-200 p-1 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(setQuantity({ productId: p.id, quantity: qty + 1 }))}
                      className="rounded border border-emerald-200 p-1 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold text-emerald-800">{lineTotal.toFixed(2)} ₼</p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(addFavorite(p))}
                    >
                      Favorilərə
                    </Button>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(p.id))}
                      className="rounded p-2 text-red-600 hover:bg-red-50"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6 border-emerald-100">
            <h2 className="text-lg font-semibold text-emerald-900">Yekun</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-emerald-700">
                <span>Ara cəmi</span>
                <span>{subtotal.toFixed(2)} ₼</span>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-emerald-800">Çatdırılma</p>
                {DELIVERY_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="text-emerald-600"
                    />
                    <span>{opt.label}</span>
                    <span className="ml-auto">{opt.price === 0 ? "Pulsuz" : `${opt.price} ₼`}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between border-t border-emerald-100 pt-2 font-semibold text-emerald-900">
                <span>Ümumi</span>
                <span>{total.toFixed(2)} ₼</span>
              </div>
            </div>
            <Button className="mt-4 w-full">Sifarişi tamamla</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
