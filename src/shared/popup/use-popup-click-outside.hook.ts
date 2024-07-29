import { useEffect } from "react";

import { getIsElementOutsideContainer } from "./is-element-outside-container";

interface UsePopupClickOutsideParams {
  readonly containerRef: React.RefObject<HTMLDivElement>;
  readonly onClose?: VoidFunction;
}

export function usePopupClickOutside(params: UsePopupClickOutsideParams) {
  useEffect(() => {
    function handleWindowMouseDown(event: MouseEvent) {
      if (
        getIsElementOutsideContainer(
          event.target as HTMLElement,
          params.containerRef.current,
        )
      ) {
        params.onClose?.();
      }
    }

    window.addEventListener("mousedown", handleWindowMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleWindowMouseDown);
    };
  }, [params]);
}
