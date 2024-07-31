import { ReactNode, useEffect, useRef, useState } from "react";

import { Menu } from "../menu";
import { Popup } from "../popup";

import * as Styled from "./popup-menu.styles";

interface PopupMenuProps {
  readonly isOpen?: boolean;
  readonly anchor: ReactNode;
  readonly children: ReactNode;
}

interface PopupMenuState {
  readonly isOpen: boolean;
}

export function PopupMenu(props: PopupMenuProps) {
  const anchorContainerRef = useRef<HTMLSpanElement>(null);

  const [state, setState] = useState<PopupMenuState>({
    isOpen: props.isOpen ?? false,
  });

  useEffect(() => {
    setState({
      isOpen: props.isOpen ?? false,
    });
  }, [props.isOpen]);

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
      <Styled.AnchorContainer onClick={handleAnchorClick}>
        <span ref={anchorContainerRef} />
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
