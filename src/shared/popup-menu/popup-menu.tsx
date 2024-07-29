import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";

import { Popover } from "../popover";

import * as Styled from "./popup-menu.styles";

interface PopupMenuProps {
  readonly anchor: ReactNode;
  readonly options: readonly PopupMenuOption[];

  readonly onSelect?: (option: PopupMenuOption) => void;
}

interface PopupMenuOption {
  readonly label: string | ReactNode;
  readonly key: string;
  readonly onClick?: MouseEventHandler<HTMLElement>;
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

  const handleClickOption = (option: PopupMenuOption) => {
    return (event: MouseEvent<HTMLElement>) => {
      setState({ isOpen: false });

      props.onSelect?.(option);

      option.onClick?.(event);
    };
  };

  return (
    <>
      <span ref={anchorContainerRef} />

      <Styled.AnchorContainer onClick={handleAnchorClick}>
        {props.anchor}
      </Styled.AnchorContainer>

      <Popover
        isOpen={state.isOpen}
        anchorElement={anchorContainerRef.current}
        onClose={handleClose}
      >
        <Styled.MenuContainer>
          {props.options.map((option) => (
            <Styled.MenuItem
              key={option.key}
              onClick={handleClickOption(option)}
            >
              {option.label}
            </Styled.MenuItem>
          ))}
        </Styled.MenuContainer>
      </Popover>
    </>
  );
}
