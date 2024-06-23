import { useEffect, useRef } from "react";

export function useEffectDifferent<T>(
  effectFn: (previousValue: T, newValue: T) => void,
  value: T
) {
  const previousValue = useRef<T>(value);
  return useEffect(() => {
    if (previousValue.current !== value) {
      effectFn(previousValue.current, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
