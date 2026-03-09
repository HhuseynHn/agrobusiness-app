import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../features/products/pages/HomePage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("../shared/pages/NotFoundPage"));
const ProtectedRoute = lazy(() =>
  import("./ProtectedRoute").then((m) => ({ default: m.ProtectedRoute }))
);

const DashboardLayout = lazy(() =>
  import("../modules/dashboard/layout/DashboardLayout").then((m) => ({ default: m.DashboardLayout }))
);
const DashboardHome = lazy(() => import("../modules/dashboard/pages/DashboardHome"));
const DashboardOrders = lazy(() => import("../modules/dashboard/pages/DashboardOrders"));
const DashboardBlog = lazy(() => import("../modules/dashboard/pages/DashboardBlog"));
const DashboardStats = lazy(() => import("../modules/dashboard/pages/DashboardStats"));
const DashboardSettings = lazy(() => import("../modules/dashboard/pages/DashboardSettings"));

const CartPage = lazy(() => import("../features/cart/pages/CartPage"));
const FavoritesPage = lazy(() => import("../features/favorites/pages/FavoritesPage"));
const ProductDetailPage = lazy(() => import("../features/products/pages/ProductDetailPage"));
const FarmerDetailPage = lazy(() => import("../modules/farmers/pages/FarmerDetailPage"));

export function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#f9fafb]">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"
        aria-hidden
      />
    </div>
  );
}

export function LazyRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="blog" element={<DashboardBlog />} />
          <Route path="stats" element={<DashboardStats />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/farmer/:id" element={<FarmerDetailPage />} />

        <Route element={<ProtectedRoute />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
