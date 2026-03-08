/**
 * Central env config. All API URLs and env vars used by the app.
 * Values are read from .env (Vite exposes only VITE_* to client).
 */
const env = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  },
  auth: {
    register: "/Auth/register",
    login: "/Auth/login",
    verifyOtp: "/Auth/verify-otp",
    refreshToken: "/Auth/refresh-token",
  },
  products: {
    list: "/products",
    categories: "/products/categories",
    featured: "/products/featured",
    bestsellers: "/products/bestsellers",
    search: "/search",
  },
  farmers: "/farmers",
  blog: "/blog",
};

export default env;
