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
    <div className="w-full min-w-0 max-w-full space-y-3 overflow-hidden">
      <div className="flex justify-between text-sm text-emerald-700">
        <span className="tabular-nums">{vMin} ₼</span>
        <span className="tabular-nums">{vMax} ₼</span>
      </div>
      <div className="flex w-full min-w-0 gap-2 overflow-hidden">
        <input
          type="range"
          min={safeMin}
          max={safeMax}
          value={vMin}
          onChange={handleMinChange}
          className="w-full min-w-0 flex-1 shrink cursor-pointer accent-emerald-600"
        />
        <input
          type="range"
          min={safeMin}
          max={safeMax}
          value={vMax}
          onChange={handleMaxChange}
          className="w-full min-w-0 flex-1 shrink cursor-pointer accent-emerald-600"
        />
      </div>
    </div>
  );
}
