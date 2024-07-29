import { HTMLProps, ReactNode, forwardRef } from "react";

import * as Styled from "./popup.styles";
import { usePopup } from "./use-popup.hook";

export interface PopupProps extends HTMLProps<HTMLDivElement> {
  readonly anchorElement: HTMLElement | null;
  readonly isOpen: boolean;
  readonly children: ReactNode;

  readonly onClose?: VoidFunction;
}

export const Popup = forwardRef((props: PopupProps, ref) => {
  const { anchorElement, isOpen, children, onClose, ...restProps } = props;

  const { containerRef } = usePopup({ ...props, ref });

  return (
    <Styled.Popper
      {...restProps}
      open={props.isOpen}
      anchorEl={props.anchorElement}
      popperOptions={{ strategy: "absolute", placement: "bottom-start" }}
    >
      <div ref={containerRef}>{props.children}</div>
    </Styled.Popper>
  );
});
