import { ReactNode, useRef, useState } from "react";

import { Button } from "../../button";
import { Props } from "../../utils";
import { Popup } from "../popup";
import { PopupWindow } from "../popup-window";

interface PopupButtonProps extends Props<typeof Button> {
  readonly renderPopup: (props: Props<typeof PopupWindow>) => ReactNode;
}

export function PopupButton(props: PopupButtonProps) {
  const { renderPopup, ...restProps } = props;

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

  const handlePopupClose = () => {
    setState((previousState) => ({
      ...previousState,
      isOpen: false,
    }));
  };

  return (
    <>
      <Button ref={buttonRef} onClick={handleButtonClick} {...restProps} />

      <Popup
        isOpen={state.isOpen}
        anchorElement={buttonRef.current}
        onClose={handlePopupClose}
      >
        {props.renderPopup({
          onClose: handlePopupClose,
        })}
      </Popup>
    </>
  );
}
