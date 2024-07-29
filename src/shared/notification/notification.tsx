import { Snackbar as MUISnackbar } from "@mui/material";

import * as Styled from "./notification.styles";
import { ShowNotificationParams } from "./show-notification";
import { useNotification } from "./use-notification.hook";

export interface NotificationProps extends ShowNotificationParams {
  readonly isOpen?: boolean;

  readonly onClose: VoidFunction;
}

const DEFAULT_DURATION = 4000;

export function Notification(props: NotificationProps) {
  const { anchorRelativePosition, size, type } = useNotification(props);

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
