import { useDispatch, useSelector } from "react-redux";
import { addReview as addReviewAction } from "../../../store/slices/reviewSlice";

function selectReviewsByProductId(state, productId) {
  const items = state.reviews?.items || [];
  return items.filter((r) => r.productId === productId);
}

export function useReviews(productId) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => selectReviewsByProductId(state, productId));
  const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

  const addReview = (payload) => {
    if (!productId) return;
    dispatch(addReviewAction({ ...payload, productId }));
  };

  return {
    reviews: sorted,
    addReview,
    loading: false,
  };
}
