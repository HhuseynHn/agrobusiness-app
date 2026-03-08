import { useRef, useCallback } from "react";

/**
 * Returns a throttled function that runs at most once every `limit` ms.
 */
export function useThrottle(fn, limit) {
  const lastRun = useRef(0);
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      const now = Date.now();
      const remaining = limit - (now - lastRun.current);

      if (remaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        lastRun.current = now;
        fn(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastRun.current = Date.now();
          timeoutRef.current = null;
          fn(...args);
        }, remaining);
      }
    },
    [fn, limit]
  );
}
