import { Star } from "lucide-react";

const RATINGS = [5, 4, 3, 2, 1];

export function RatingFilter({ value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-emerald-900">Rating</p>
      {RATINGS.map((rating) => (
        <label key={rating} className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={value === rating}
            onChange={() => onChange(value === rating ? null : rating)}
            className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
          />
          <div className="flex items-center gap-0.5">
            {RATINGS.map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-sm text-emerald-700">{rating}+</span>
        </label>
      ))}
    </div>
  );
}
