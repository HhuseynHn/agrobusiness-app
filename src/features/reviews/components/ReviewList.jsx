import { RatingStars } from "./RatingStars";

export function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-emerald-600">Hələ rəy yoxdur. İlk rəyi siz yazın.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r.id} className="flex gap-3 border-b border-emerald-50 pb-4 last:border-0">
          <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-medium">
            {(r.userName || "?")[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-emerald-800">{r.userName}</p>
            <RatingStars rating={r.rating} size="sm" />
            <p className="mt-1 text-sm text-emerald-700">{r.comment}</p>
            <p className="mt-1 text-xs text-emerald-500">
              {r.date ? new Date(r.date).toLocaleDateString("az-AZ") : ""}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
