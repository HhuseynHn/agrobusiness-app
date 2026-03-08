import axios from "axios";
import env from "../../../config/env";
import { getAccessToken } from "../../auth/services/authService";

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

export async function fetchProducts(filters = {}) {
  const { category, minPrice, maxPrice, rating, sort, page, limit, search: q } = filters;
  const params = {};
  if (category) params.category = category;
  if (minPrice != null) params.minPrice = minPrice;
  if (maxPrice != null) params.maxPrice = maxPrice;
  if (rating != null) params.rating = rating;
  if (sort) params.sort = sort;
  if (page != null) params.page = page;
  if (limit != null) params.limit = limit;
  if (q) params.q = q;
  const { data } = await client.get(env.products.list, { params });
  return data;
}

export async function fetchCategories() {
  const { data } = await client.get(env.products.categories);
  return data;
}

export async function fetchFeatured() {
  const { data } = await client.get(env.products.featured);
  return data;
}

export async function fetchBestsellers() {
  const { data } = await client.get(env.products.bestsellers);
  return data;
}

export async function searchProducts(query, params = {}) {
  const { data } = await client.get(env.products.search, {
    params: { q: query, ...params },
  });
  return data;
}

export async function fetchFarmers() {
  const { data } = await client.get(env.farmers);
  return data;
}

export async function fetchBlogPosts() {
  const { data } = await client.get(env.blog);
  return data;
}

