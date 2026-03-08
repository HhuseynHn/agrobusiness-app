import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../mock/data.js";

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await mockApi.getBlogPosts();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload || [];
      })
      .addCase(fetchBlogPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default blogSlice.reducer;
export const selectBlogPosts = (state) => state.blog.posts;
