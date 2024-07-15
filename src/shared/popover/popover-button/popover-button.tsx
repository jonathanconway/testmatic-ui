import { ReactNode, useRef, useState } from "react";

import { Button } from "../../button";
import { Popover, PopoverWindow } from "../../popover";
import { Props } from "../../utils";

interface PopoverButtonProps extends Props<typeof Button> {
  readonly renderPopover: (props: Props<typeof PopoverWindow>) => ReactNode;
}

export function PopoverButton(props: PopoverButtonProps) {
  const { renderPopover, ...restProps } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [state, setState] = useState({
    isOpen: false,
  });

  const handleButtonClick = () => {
    setState((previousState) => ({
      ...previousState,
      isOpen: true,
    }));
  };

  const handlePopoverClose = () => {
    setState((previousState) => ({
      ...previousState,
      isOpen: false,
    }));
  };

  return (
    <>
      <Button ref={buttonRef} onClick={handleButtonClick} {...restProps} />

      <Popover
        isOpen={state.isOpen}
        anchorElement={buttonRef.current}
        onClose={handlePopoverClose}
      >
        {props.renderPopover({
          onClose: handlePopoverClose,
        })}
      </Popover>
    </>
  );
}
