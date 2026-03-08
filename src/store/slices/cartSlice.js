import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { productId, product, quantity }
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const { product, quantity = 1 } = payload;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.quantity = Math.min((existing.quantity || 0) + quantity, product.stock ?? 999);
      } else {
        state.items.push({
          productId: product.id,
          product: { ...product },
          quantity: Math.min(quantity, product.stock ?? 999),
        });
      }
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((i) => i.productId !== payload);
    },
    setQuantity: (state, { payload }) => {
      const { productId, quantity } = payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.quantity = Math.max(1, Math.min(quantity, item.product.stock ?? 999));
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeSelected: (state, { payload }) => {
      const ids = Array.isArray(payload) ? payload : [payload];
      state.items = state.items.filter((i) => !ids.includes(i.productId));
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart, removeSelected } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, i) => acc + (i.quantity || 1), 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((acc, i) => acc + (i.product?.price ?? 0) * (i.quantity || 1), 0);
