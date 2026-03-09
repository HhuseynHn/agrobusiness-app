import { createSlice } from "@reduxjs/toolkit";
import { mockReviews } from "../../mock/data";

const STORAGE_KEY = "agro_reviews";

function loadReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [...mockReviews];
}

function saveReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {}
}

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { items: loadReviews() },
  reducers: {
    addReview: (state, { payload }) => {
      const review = {
        id: Date.now(),
        productId: payload.productId,
        userId: payload.userId || "guest",
        userName: payload.userName || "İstifadəçi",
        userAvatar: payload.userAvatar || null,
        rating: payload.rating,
        comment: payload.comment || "",
        images: payload.images || [],
        likes: 0,
        date: new Date().toISOString(),
      };
      state.items.push(review);
      saveReviews(state.items);
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
export const selectReviewsByProductId = (state, productId) =>
  (state.reviews?.items || []).filter((r) => r.productId === productId);
