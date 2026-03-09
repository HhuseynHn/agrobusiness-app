import { useState } from "react";
import { Button } from "../../../components/ui/button";
export function ReviewForm({ productId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const displayRating = hoverRating || rating;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || rating < 1) return;
    setSubmitting(true);
    onSubmit({
      productId,
      rating,
      comment: comment.trim(),
      userName: userName.trim() || "İstifadəçi",
    });
    setRating(0);
    setHoverRating(0);
    setComment("");
    setUserName("");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
      <h3 className="text-sm font-semibold text-emerald-800">Rəy yaz</h3>
      <div className="mt-3 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-emerald-700">Adınız</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Adınız (isteğe bağlı)"
            className="w-full rounded-md border border-emerald-200 px-3 py-2 text-sm text-emerald-800 placeholder:text-emerald-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-emerald-700">Reytinq</label>
          <div className="flex gap-0.5" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((s) => {
              const filled = s <= (hoverRating || rating);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  className="p-0.5 focus:outline-none"
                  aria-label={s + " ulduz"}
                >
                  <span className={filled ? "text-amber-400" : "text-gray-200"}>★</span>
                </button>
              );
            })}
          </div>
          <p className="mt-0.5 text-xs text-emerald-600">
            {displayRating ? displayRating + " ulduz" : "Ulduz seçin"}
          </p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-emerald-700">Rəy</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Rəyinizi yazın..."
            rows={3}
            className="w-full rounded-md border border-emerald-200 px-3 py-2 text-sm text-emerald-800 placeholder:text-emerald-400"
          />
        </div>
        <Button type="submit" disabled={rating < 1 || submitting}>
          {submitting ? "Göndərilir..." : "Göndər"}
        </Button>
      </div>
    </form>
  );
}
