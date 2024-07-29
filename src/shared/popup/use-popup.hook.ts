import { ForwardedRef, ReactNode, RefObject, useEffect, useRef } from "react";

import { usePopupClickOutside } from "./use-popup-click-outside.hook";

export interface UsePopupParams {
  readonly anchorElement: HTMLElement | null;
  readonly isOpen: boolean;
  readonly children: ReactNode;

  readonly ref: ForwardedRef<unknown>;

  readonly onClose?: VoidFunction;
}

export function usePopup(params: UsePopupParams) {
  const containerNewRef = useRef<HTMLDivElement>(null);
  const containerPassedRef = params.ref as RefObject<HTMLDivElement>;
  const containerRef = containerPassedRef ?? containerNewRef;

  usePopupClickOutside({
    containerRef,
    onClose: params.onClose,
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        params.onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.onClose]);

  return {
    containerRef,
  };
}
