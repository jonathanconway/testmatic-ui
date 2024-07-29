import { HTMLProps, ReactNode, useEffect, useRef } from "react";

import { Heading } from "../../heading";
import { IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { Tooltip } from "../../tooltip";
import { getIsElementOutsideContainer } from "../is-element-outside-container";
import { usePopupClickOutside } from "../use-popup-click-outside.hook";

import * as Styled from "./popup-window.styles";

interface PopupWindowProps extends Omit<HTMLProps<HTMLDivElement>, "title"> {
  readonly title?: string | ReactNode;
  readonly actions?: ReactNode;

  readonly onClose?: VoidFunction;
}

function focusFirstFocusableElement(container?: HTMLElement | null) {
  (
    container?.querySelector(
      "input, select, textarea, button, object, a, area[href], [tabindex]",
    ) as HTMLElement
  )?.focus();
}

export function PopupWindow(props: PopupWindowProps) {
  const { title, actions, width, children, onClose, ...restProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      focusFirstFocusableElement(containerRef.current);
    });
  }, []);

  usePopupClickOutside({
    onClose,
    containerRef,
  });

  useEffect(() => {
    function handleWindowFocusIn(event: FocusEvent) {
      if (
        getIsElementOutsideContainer(
          event.target as HTMLElement,
          containerRef.current,
        )
      ) {
        focusFirstFocusableElement(containerRef.current);
      }
    }

    window.addEventListener("focusin", handleWindowFocusIn);

    return () => {
      window.removeEventListener("focusin", handleWindowFocusIn);
    };
  }, []);

  // todo: capture tab

  return (
    <Styled.Container {...restProps} $width={props.width} ref={containerRef}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" style={{ flex: 1 }}>
            <Heading level={3}>{props.title}</Heading>
          </Stack>
          <Tooltip contents="Close">
            <IconButton icon={IconNames.Close} onClick={onClose} />
          </Tooltip>
        </Stack>

        {children}

        {props.actions && (
          <Stack direction="row" justifyContent="space-between">
            <div></div>
            {props.actions}
          </Stack>
        )}
      </Stack>
    </Styled.Container>
  );
}
