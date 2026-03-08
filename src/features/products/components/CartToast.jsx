import { useCartFavorites } from "../../../context/CartFavoritesContext";

export function CartToast() {
  const { toast } = useCartFavorites();
  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isInfo = toast.type === "info";

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-emerald-200 bg-white px-4 py-3 shadow-lg transition-all"
      role="alert"
    >
      <p
        className={`text-sm font-medium ${
          isSuccess ? "text-emerald-700" : isInfo ? "text-amber-700" : "text-emerald-700"
        }`}
      >
        {toast.message}
      </p>
    </div>
  );
}
