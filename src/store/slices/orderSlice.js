import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../mock/data.js";

export const fetchOrders = createAsyncThunk("orders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await mockApi.getOrders();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => { state.loading = false; state.items = payload || []; })
      .addCase(fetchOrders.rejected, (state, { payload }) => { state.loading = false; state.error = payload; });
  },
});

export default orderSlice.reducer;
export const selectOrders = (state) => state.orders.items;
