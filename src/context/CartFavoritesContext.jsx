import { createContext, useContext, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  addToCart as reduxAddToCart,
  removeFromCart as reduxRemoveFromCart,
  setQuantity as reduxSetQuantity,
} from "../store/slices/cartSlice";
import {
  selectFavorites,
  toggleFavorite as reduxToggleFavorite,
} from "../store/slices/favoriteSlice";

const RECENT_VIEWED_KEY = "agro_recent_viewed";
const MAX_RECENT = 5;

function loadJson(key, fallback = []) {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const CartFavoritesContext = createContext(null);

export function CartFavoritesProvider({ children }) {
  const dispatch = useDispatch();
  const reduxCartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const favorites = useSelector(selectFavorites);
  const [toast, setToast] = useState(null);
  const [recentViewed, setRecentViewed] = useState(() => loadJson(RECENT_VIEWED_KEY, []));

  const cartItems = useMemo(
    () => reduxCartItems.map((i) => ({ ...i.product, quantity: i.quantity || 1 })),
    [reduxCartItems]
  );

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      const existing = reduxCartItems.some((i) => i.productId === product.id);
      dispatch(reduxAddToCart({ product, quantity }));
      showToast(existing ? "Bu məhsul artıq səbətdədir" : "Səbətə əlavə edildi", existing ? "info" : "success");
    },
    [dispatch, showToast, reduxCartItems]
  );

  const removeFromCart = useCallback(
    (productId) => {
      dispatch(reduxRemoveFromCart(productId));
    },
    [dispatch]
  );

  const toggleFavorite = useCallback(
    (product) => {
      dispatch(reduxToggleFavorite(product));
      const has = favorites.some((p) => p.id === product.id);
      showToast(has ? "Favorilərdən çıxarıldı" : "Favorilərə əlavə edildi");
    },
    [dispatch, favorites, showToast]
  );

  const isFavorite = useCallback(
    (productId) => favorites.some((p) => p.id === productId),
    [favorites]
  );

  const addRecentViewed = useCallback((product) => {
    setRecentViewed((prev) => {
      const rest = prev.filter((p) => p.id !== product.id);
      const next = [product, ...rest].slice(0, MAX_RECENT);
      saveJson(RECENT_VIEWED_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      favorites,
      favoritesCount: favorites.length,
      toast,
      recentViewed,
      addToCart,
      removeFromCart,
      toggleFavorite,
      isFavorite,
      addRecentViewed,
      showToast,
    }),
    [
      cartItems,
      cartCount,
      favorites,
      toast,
      recentViewed,
      addToCart,
      removeFromCart,
      toggleFavorite,
      isFavorite,
      addRecentViewed,
      showToast,
    ]
  );

  return (
    <CartFavoritesContext.Provider value={value}>
      {children}
    </CartFavoritesContext.Provider>
  );
}

export function useCartFavorites() {
  const ctx = useContext(CartFavoritesContext);
  if (!ctx) throw new Error("useCartFavorites must be used within CartFavoritesProvider");
  return ctx;
}
