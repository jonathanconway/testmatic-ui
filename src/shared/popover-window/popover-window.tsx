import { HTMLProps, useEffect, useRef } from "react";

import { Heading } from "../heading";
import { IconButton } from "../icon-button";
import { Stack } from "../layout";
import { Tooltip } from "../tooltip";

import * as Styled from "./popover-window.styles";

interface PopoverWindowProps extends HTMLProps<HTMLDivElement> {
  readonly title?: string;
  readonly onClose?: VoidFunction;
}

function isDescendentOf(element: HTMLElement, parent: HTMLElement) {
  while (element) {
    if (element === parent) {
      return true;
    }
    element = element.parentElement as HTMLElement;
  }
  return false;
}

export function PopoverWindow(props: PopoverWindowProps) {
  const { title, children, onClose, ...restProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function listener(event: MouseEvent) {
      if (
        event.target &&
        containerRef.current &&
        !isDescendentOf(event.target as HTMLElement, containerRef.current)
      ) {
        onClose?.();
      }
    }

    window.addEventListener("mousedown", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
    };
  }, [onClose]);

  // todo: capture tab

  return (
    <Styled.Container {...restProps} ref={containerRef}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" style={{ flex: 1 }}>
            <Heading level={3}>{props.title}</Heading>
          </Stack>
          <Tooltip contents="Close">
            <IconButton icon="close" onClick={onClose} />
          </Tooltip>
        </Stack>

        {children}
      </Stack>
    </Styled.Container>
  );
}
