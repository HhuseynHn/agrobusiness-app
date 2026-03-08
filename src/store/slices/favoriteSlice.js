import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: { items: [], collections: [] },
  reducers: {
    addFavorite: (state, action) => {
      const payload = action.payload;
      if (!state.items.some((p) => p.id === payload.id)) state.items.push(Object.assign({}, payload));
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const payload = action.payload;
      const product = typeof payload === "object" ? payload : state.items.find((p) => p.id === payload);
      if (!product) return;
      const idx = state.items.findIndex((p) => p.id === product.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(Object.assign({}, product));
    },
    createCollection: (state, action) => {
      const name = (action.payload && action.payload.name) || "Yeni";
      state.collections.push({ id: String(Date.now()), name, productIds: [] });
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, addToCollection, createCollection } = favoriteSlice.actions;
export default favoriteSlice.reducer;
export const selectFavorites = (state) => state.favorites.items;
export const selectCollections = (state) => state.favorites.collections;
