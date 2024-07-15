import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";

import { Popover } from "../popover";

import * as Styled from "./menu.styles";

interface MenuProps {
  readonly anchor: ReactNode;
  readonly options: readonly MenuOption[];

  readonly onSelect?: (option: MenuOption) => void;
}

interface MenuOption {
  readonly label: string | ReactNode;
  readonly key: string;
  readonly onClick?: MouseEventHandler<HTMLElement>;
}

interface MenuState {
  readonly isOpen: boolean;
}

export function Menu(props: MenuProps) {
  const anchorContainerRef = useRef<HTMLSpanElement>(null);

  const [state, setState] = useState<MenuState>({
    isOpen: false,
  });

  const handleAnchorClick = () => {
    setState({ isOpen: true });
  };

  const handleClose = () => {
    setState({ isOpen: false });
  };

  const handleClickOption = (option: MenuOption) => {
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
