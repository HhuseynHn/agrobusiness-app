import { useCallback } from "react";
import { DEFAULT_PRICE_RANGE, clampPriceRange } from "../utils/filters";

export function PriceRangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const safeMin = min ?? DEFAULT_PRICE_RANGE.min;
  const safeMax = max ?? DEFAULT_PRICE_RANGE.max;
  const vMin = valueMin ?? safeMin;
  const vMax = valueMax ?? safeMax;

  const handleMinChange = useCallback(
    (e) => {
      const val = clampPriceRange(Number(e.target.value), safeMin, vMax);
      onChange(val, vMax);
    },
    [onChange, safeMin, vMax]
  );

  const handleMaxChange = useCallback(
    (e) => {
      const val = clampPriceRange(Number(e.target.value), vMin, safeMax);
      onChange(vMin, val);
    },
    [onChange, vMin, safeMax]
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-emerald-700">
        <span>{vMin} ₼</span>
        <span>{vMax} ₼</span>
      </div>
      <div className="flex gap-2">
        <input
          type="range"
          min={safeMin}
          max={safeMax}
          value={vMin}
          onChange={handleMinChange}
          className="flex-1 accent-emerald-600"
        />
        <input
          type="range"
          min={safeMin}
          max={safeMax}
          value={vMax}
          onChange={handleMaxChange}
          className="flex-1 accent-emerald-600"
        />
      </div>
    </div>
  );
}
