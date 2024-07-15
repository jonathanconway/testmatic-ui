import { Snackbar as MUISnackbar } from "@mui/material";
import { useMemo } from "react";

import { NotificationTypes } from "./notification-type";
import * as Styled from "./notification.styles";
import { ShowNotificationParams } from "./show-notification";

export interface NotificationProps extends ShowNotificationParams {
  readonly isOpen?: boolean;

  readonly onClose: VoidFunction;
}

const DEFAULT_DURATION = 4000;

export function Notification(props: NotificationProps) {
  const anchorRelativePosition = useMemo(() => {
    if (!props.anchorElement && !props.anchorDOMRect) return;

    const bodyRect = document.body.getBoundingClientRect();
    const anchorElementRect =
      props.anchorElement?.getBoundingClientRect() ??
      (props.anchorDOMRect as DOMRect);
    const anchorElementTop = anchorElementRect.top - bodyRect.top;

    return {
      left: anchorElementRect.left,
      top: anchorElementTop + (props.anchorElement?.offsetHeight ?? 15) + 10,
      height: "1rem",
    };
  }, [props.anchorDOMRect, props.anchorElement]);

  const size = props.anchorElement ? "small" : "normal";
  const type = props.type ?? NotificationTypes.Info;

  return (
    <MUISnackbar
      open={props.isOpen}
      autoHideDuration={props.duration ?? DEFAULT_DURATION}
      onClose={props.onClose}
      style={anchorRelativePosition}
    >
      <Styled.NotificationBox $size={size} $type={type} onClick={props.onClose}>
        {props.message}
      </Styled.NotificationBox>
    </MUISnackbar>
  );
}
