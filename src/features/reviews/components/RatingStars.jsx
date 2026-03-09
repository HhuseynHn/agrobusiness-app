import { Star } from "lucide-react";

export function RatingStars({ rating, max = 5, size = "md", showValue }) {
  const value = Math.min(max, Math.max(0, Number(rating) || 0));
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={sizeClass + " shrink-0 " + (i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-gray-200")}
        />
      ))}
      {showValue && <span className="ml-1 text-sm text-emerald-700">({value.toFixed(1)})</span>}
    </div>
  );
}
