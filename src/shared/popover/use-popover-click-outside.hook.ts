import { useEffect } from "react";

import { isElementOutsideContainer } from "./is-element-outside-container";

interface UsePopoverClickOutsideParams {
  readonly containerRef: React.RefObject<HTMLDivElement>;
  readonly onClose?: VoidFunction;
}

export function usePopoverClickOutside(params: UsePopoverClickOutsideParams) {
  useEffect(() => {
    function handleWindowMouseDown(event: MouseEvent) {
      if (
        isElementOutsideContainer(
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
