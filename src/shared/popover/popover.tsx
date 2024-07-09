import { HTMLProps, ReactNode } from "react";

import * as Styled from "./popover.styles";

export interface PopoverProps extends HTMLProps<HTMLDivElement> {
  readonly anchorElement: HTMLElement | null;
  readonly isOpen: boolean;
  readonly children: ReactNode;
}

export function Popover(props: PopoverProps) {
  return (
    <Styled.Popper
      open={props.isOpen}
      anchorEl={props.anchorElement}
      popperOptions={{ strategy: "absolute", placement: "bottom-start" }}
    >
      {props.children}
    </Styled.Popper>
  );
}
