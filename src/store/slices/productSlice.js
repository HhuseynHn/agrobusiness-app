import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../mock/data.js";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await mockApi.getProducts();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const product = await mockApi.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], currentProduct: null, loading: false, error: null },
  reducers: {
    clearCurrentProduct: (state) => { state.currentProduct = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => { state.loading = false; state.items = payload || []; })
      .addCase(fetchProducts.rejected, (state, { payload }) => { state.loading = false; state.error = payload; })
      .addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => { state.loading = false; state.currentProduct = payload; })
      .addCase(fetchProductById.rejected, (state, { payload }) => { state.loading = false; state.error = payload; });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
export const selectProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectFeaturedProducts = (state) => (state.products.items || []).filter((p) => p.isFeatured);
