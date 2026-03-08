import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import logo from "../../../assets/icons/Logo_nw.png";
import { useAuth } from "../../../context/AuthContext";
import { useCartFavorites } from "../../../context/CartFavoritesContext";
import { SearchBar } from "./SearchBar";

export function Header({ searchValue, onSearchChange, categoryFilter, onCategoryChange }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cartCount, favoritesCount, showToast } = useCartFavorites();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  function handleLogout() {
    logout();
    setShowProfileMenu(false);
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img src={logo} alt="AgroBusiness" className="h-9 w-9 rounded-full object-cover" />
          <span className="hidden font-semibold text-emerald-800 sm:inline">AgroBusiness</span>
        </button>

        <div className="hidden flex-1 max-w-xl md:block">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            categoryValue={categoryFilter}
            onCategoryChange={onCategoryChange}
            placeholder="Məhsul axtar..."
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 md:flex-none md:gap-2">
          <button
            type="button"
            onClick={() => setShowMobileSearch((v) => !v)}
            className="rounded-full p-2 text-emerald-700 hover:bg-emerald-50 md:hidden"
            aria-label="Axtarış"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/favorites")}
            className="relative rounded-full p-2 text-emerald-700 hover:bg-emerald-50"
            aria-label="Favorilər"
          >
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {favoritesCount > 9 ? "9+" : favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative rounded-full p-2 text-emerald-700 hover:bg-emerald-50"
            aria-label="Səbət"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-medium text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((v) => !v)}
              className="flex items-center gap-1 rounded-full px-2 py-1.5 text-emerald-700 hover:bg-emerald-50 md:px-3"
              aria-label="Profil"
            >
              <User className="h-5 w-5" />
              <span className="hidden text-sm font-medium md:inline">
                {isAuthenticated ? "Profil" : "Daxil ol"}
              </span>
            </button>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-10" aria-hidden onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-emerald-100 bg-white py-1 shadow-lg">
                  {isAuthenticated ? (
                    <>
                      <button
                        type="button"
                        onClick={() => { navigate("/dashboard"); setShowProfileMenu(false); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-emerald-800 hover:bg-emerald-50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-emerald-800 hover:bg-emerald-50"
                      >
                        <User className="h-4 w-4" />
                        Profil
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Çıxış
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => { navigate("/login"); setShowProfileMenu(false); }}
                        className="w-full px-3 py-2 text-left text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                      >
                        Daxil ol
                      </button>
                      <button
                        type="button"
                        onClick={() => { navigate("/register"); setShowProfileMenu(false); }}
                        className="w-full px-3 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50"
                      >
                        Qeydiyyat
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showMobileSearch && (
        <div className="border-t border-emerald-100 px-4 py-3 md:hidden">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            categoryValue={categoryFilter}
            onCategoryChange={onCategoryChange}
            placeholder="Məhsul axtar..."
          />
        </div>
      )}
    </header>
  );
}
