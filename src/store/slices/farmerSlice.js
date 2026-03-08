import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../mock/data.js";

export const fetchFarmers = createAsyncThunk("farmers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await mockApi.getFarmers();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const farmerSlice = createSlice({
  name: "farmers",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFarmers.fulfilled, (state, { payload }) => { state.loading = false; state.items = payload || []; })
      .addCase(fetchFarmers.rejected, (state, { payload }) => { state.loading = false; state.error = payload; });
  },
});

export default farmerSlice.reducer;
export const selectFarmers = (state) => state.farmers.items;
export const selectFarmerById = (state, id) => state.farmers.items.find((f) => f.id === id);
