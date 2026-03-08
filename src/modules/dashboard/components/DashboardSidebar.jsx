import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Heart,
  ClipboardList,
  Users,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarCollapsed, selectSidebarCollapsed } from "../../../store/slices/uiSlice";
import { selectCartCount } from "../../../store/slices/cartSlice";
import { selectFavorites } from "../../../store/slices/favoriteSlice";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Ana səhifə" },
  { to: "/", icon: Package, label: "Məhsullar" },
  { to: "/cart", icon: ShoppingCart, label: "Səbət" },
  { to: "/favorites", icon: Heart, label: "Favorilər" },
  { to: "/dashboard/orders", icon: ClipboardList, label: "Sifarişlər" },
  { to: "/farmers", icon: Users, label: "Fermerlər" },
  { to: "/dashboard/blog", icon: FileText, label: "Bloq" },
  { to: "/dashboard/stats", icon: BarChart3, label: "Statistika" },
  { to: "/dashboard/settings", icon: Settings, label: "Ayarlar" },
];

export function DashboardSidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectSidebarCollapsed);
  const cartCount = useSelector(selectCartCount);
  const favs = useSelector(selectFavorites);
  const favoritesCount = favs.length;

  const getBadge = (label) => {
    if (label === "Səbət" && cartCount > 0) return cartCount;
    if (label === "Favorilər" && favoritesCount > 0) return favoritesCount;
    return null;
  };

  return (
    <aside
      className={
        "flex flex-col border-r border-emerald-100 bg-white/95 backdrop-blur transition-all duration-300 " +
        (collapsed ? "w-[72px]" : "w-56")
      }
    >
      <div className="flex h-14 items-center justify-between border-b border-emerald-100 px-3">
        {!collapsed && (
          <span className="text-lg font-semibold text-emerald-800">AgroBusiness</span>
        )}
        <button
          type="button"
          onClick={() => dispatch(setSidebarCollapsed())}
          className="rounded p-2 text-emerald-600 hover:bg-emerald-50"
          aria-label={collapsed ? "Genişlət" : "Daralt"}
        >
          <ChevronLeft
            className={"h-5 w-5 transition-transform " + (collapsed ? "rotate-180" : "")}
          />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const b = getBadge(item.label);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
                (isActive ? "bg-emerald-100 text-emerald-800" : "text-emerald-700 hover:bg-emerald-50") +
                (collapsed ? " justify-center" : "")
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {b != null && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                      {b}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
