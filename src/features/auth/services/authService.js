import env from "../../../config/env";
import axiosInstance from "../../../shared/services/axiosConfig";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("pendingEmail");
}

export const authClient = axiosInstance;

let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, token) {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  refreshQueue = [];
}

authClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return authClient(originalRequest);
          })
          .catch((err) => {
            throw err;
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await refreshToken();
        processQueue(null, newTokens.accessToken);
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        clearTokens();
        window.location.replace("/login");
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);

export async function register(payload) {
  const { data } = await authClient.post(env.auth.register, payload);
  return data;
}

export async function verifyOtp(payload) {
  const { data } = await authClient.post(env.auth.verifyOtp, payload);
  return data;
}

export async function login(payload) {
  const { data } = await authClient.post(env.auth.login, payload);

  if (data?.accessToken || data?.refreshToken) {
    setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }

  return data;
}

export async function refreshToken() {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) {
    throw new Error("Refresh token is missing");
  }

  const { data } = await authClient.post(env.auth.refreshToken, {
    refreshToken: refreshTokenValue,
  });

  if (data?.accessToken || data?.refreshToken) {
    setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? refreshTokenValue,
    });
  }

  return data;
}

export function logout() {
  clearTokens();
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getToken() {
  return getAccessToken();
}

export function isAuthenticated() {
  return !!getToken();
}

