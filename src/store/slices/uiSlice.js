import { createSlice } from "@reduxjs/toolkit";

const themeFromStorage = () => {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem("theme") || "light";
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: themeFromStorage(),
    sidebarCollapsed: false,
    modal: null,
    toasts: [],
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload === "dark" ? "dark" : "light";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", state.theme);
        document.documentElement.classList.toggle("dark", state.theme === "dark");
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", state.theme);
        document.documentElement.classList.toggle("dark", state.theme === "dark");
      }
    },
    setSidebarCollapsed: (state, { payload }) => {
      state.sidebarCollapsed = payload ?? !state.sidebarCollapsed;
    },
    openModal: (state, { payload }) => {
      state.modal = payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
    addToast: (state, { payload }) => {
      state.toasts.push({
        id: Date.now().toString(),
        type: payload?.type ?? "success",
        message: payload?.message ?? "",
      });
    },
    removeToast: (state, { payload }) => {
      state.toasts = state.toasts.filter((t) => t.id !== payload);
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarCollapsed,
  openModal,
  closeModal,
  addToast,
  removeToast,
} = uiSlice.actions;
export default uiSlice.reducer;
export const selectTheme = (state) => state.ui.theme;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectToasts = (state) => state.ui.toasts;
