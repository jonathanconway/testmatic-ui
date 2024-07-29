import { ReactNode, useRef, useState } from "react";

import { Menu } from "../menu";
import { Popup } from "../popup";

import * as Styled from "./popup-menu.styles";

interface PopupMenuProps {
  readonly anchor: ReactNode;
  readonly children: ReactNode;
}

interface PopupMenuState {
  readonly isOpen: boolean;
}

export function PopupMenu(props: PopupMenuProps) {
  const anchorContainerRef = useRef<HTMLSpanElement>(null);

  const [state, setState] = useState<PopupMenuState>({
    isOpen: false,
  });

  const handleAnchorClick = () => {
    setState({ isOpen: true });
  };

  const handleClose = () => {
    setState({ isOpen: false });
  };

  const handleClick = () => {
    setState({ isOpen: false });
  };

  return (
    <>
      <span ref={anchorContainerRef} />

      <Styled.AnchorContainer onClick={handleAnchorClick}>
        {props.anchor}
      </Styled.AnchorContainer>

      <Popup
        isOpen={state.isOpen}
        anchorElement={anchorContainerRef.current}
        onClose={handleClose}
      >
        <Menu onClick={handleClick}>{props.children}</Menu>
      </Popup>
    </>
  );
}
