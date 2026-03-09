import axios from "axios";
import env from "../../../config/env";
import { getAccessToken } from "../../auth/services/authService";
import {
  mockProducts,
  mockFarmers,
  mockAgriculturalData,
} from "../../../mock/data";

const client = axios.create({
  baseURL: env.api.baseUrl,
});

client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function filterProductsClientSide(products, filters) {
  let list = [...products];
  if (filters.category) {
    list = list.filter((p) => (p.category || "").toLowerCase() === (filters.category || "").toLowerCase());
  }
  if (filters.minPrice != null) list = list.filter((p) => (p.price ?? 0) >= filters.minPrice);
  if (filters.maxPrice != null) list = list.filter((p) => (p.price ?? 0) <= filters.maxPrice);
  if (filters.rating != null) list = list.filter((p) => (p.rating ?? 0) >= filters.rating);
  if (filters.q) {
    const q = (filters.q || "").toLowerCase();
    list = list.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }
  return list;
}

export async function fetchProducts(filters = {}) {
  try {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.minPrice != null) params.minPrice = filters.minPrice;
    if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
    if (filters.rating != null) params.rating = filters.rating;
    if (filters.sort) params.sort = filters.sort;
    if (filters.page != null) params.page = filters.page;
    if (filters.limit != null) params.limit = filters.limit;
    if (filters.q) params.q = filters.q;
    const { data } = await client.get(env.products.list, { params });
    return Array.isArray(data) ? data : data?.items ?? data?.data ?? [];
  } catch {
    await delay(400);
    const list = filterProductsClientSide(mockProducts, filters);
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    const start = (page - 1) * limit;
    return list.slice(start, start + limit);
  }
}

export async function fetchCategories() {
  try {
    const { data } = await client.get(env.products.categories);
    return data;
  } catch {
    await delay(300);
    return [
      { id: 1, name: "Meyvələr", slug: "meyveler" },
      { id: 2, name: "Tərəvəzlər", slug: "terezeler" },
    ];
  }
}

export async function fetchFeatured() {
  try {
    const { data } = await client.get(env.products.featured);
    return Array.isArray(data) ? data : data?.items ?? [];
  } catch {
    await delay(300);
    return mockProducts.filter((p) => p.isFeatured).slice(0, 6);
  }
}

export async function fetchBestsellers() {
  try {
    const { data } = await client.get(env.products.bestsellers);
    return Array.isArray(data) ? data : data?.items ?? [];
  } catch {
    await delay(300);
    return mockProducts.slice(0, 6);
  }
}

export async function searchProducts(query, params = {}) {
  try {
    const { data } = await client.get(env.products.search, {
      params: { q: query, ...params },
    });
    return data;
  } catch {
    await delay(300);
    const q = (query || "").toLowerCase();
    return mockProducts.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }
}

export async function fetchFarmers() {
  try {
    const { data } = await client.get(env.farmers);
    return Array.isArray(data) ? data : data?.items ?? data;
  } catch {
    await delay(500);
    return mockFarmers;
  }
}

export async function fetchBlogPosts() {
  try {
    const { data } = await client.get(env.blog);
    return data;
  } catch {
    return [];
  }
}

/** Mock-based API (simulated delay). Use when backend is unavailable. */
export const productService = {
  getAllProducts: () => delay(500).then(() => mockProducts),
  getProductById: (id) =>
    delay(300).then(() => {
      const p = mockProducts.find((x) => x.id === id);
      if (p) return p;
      throw new Error("Məhsul tapılmadı");
    }),
  getFarmers: () => delay(500).then(() => mockFarmers),
  getAgriculturalData: () => delay(500).then(() => mockAgriculturalData),
  getProductsByFarmer: (farmerId) =>
    delay(300).then(() => {
      const farmer = mockFarmers.find((f) => f.id === farmerId);
      if (!farmer || !farmer.products) return [];
      return mockProducts.filter((p) => farmer.products.includes(p.id));
    }),
};

