import {
  HTMLProps,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import * as Styled from "./popover.styles";
import { usePopoverClickOutside } from "./use-popover-click-outside.hook";

export interface PopoverProps extends HTMLProps<HTMLDivElement> {
  readonly anchorElement: HTMLElement | null;
  readonly isOpen: boolean;
  readonly children: ReactNode;
  readonly onClose?: VoidFunction;
}

export const Popover = forwardRef((props: PopoverProps, ref) => {
  const containerNewRef = useRef<HTMLDivElement>(null);
  const containerPassedRef = ref as RefObject<HTMLDivElement>;
  const containerRef = containerPassedRef ?? containerNewRef;

  usePopoverClickOutside({
    containerRef,
    onClose: props.onClose,
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        props.onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClose]);

  return (
    <Styled.Popper
      open={props.isOpen}
      anchorEl={props.anchorElement}
      popperOptions={{ strategy: "absolute", placement: "bottom-start" }}
    >
      <div ref={containerRef}>{props.children}</div>
    </Styled.Popper>
  );
});
