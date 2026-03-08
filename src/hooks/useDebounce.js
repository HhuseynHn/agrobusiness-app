import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Debounce a value. After `delay` ms without change, returns the latest value.
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in ms (e.g. 500)
 * @returns debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounced callback. Returns a function that, when called, invokes the original
 * callback after `delay` ms with the latest arguments.
 */
export function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current?.(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );
}
