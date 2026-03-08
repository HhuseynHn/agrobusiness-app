import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: null,
    minPrice: null,
    maxPrice: null,
    rating: null,
    sort: null,
    search: "",
  },
  reducers: {
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
    setPriceRange: (state, { payload }) => {
      if (payload?.min != null) state.minPrice = payload.min;
      if (payload?.max != null) state.maxPrice = payload.max;
    },
    setRating: (state, { payload }) => {
      state.rating = payload;
    },
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload ?? "";
    },
    setFilters: (state, { payload }) => {
      if (payload) Object.assign(state, payload);
    },
    resetFilters: (state) => {
      state.category = null;
      state.minPrice = null;
      state.maxPrice = null;
      state.rating = null;
      state.sort = null;
      state.search = "";
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setRating,
  setSort,
  setSearch,
  setFilters,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
export const selectFilters = (state) => state.filter;
