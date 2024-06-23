import { Props, TypeOfConst } from "../utils";
import { Alert as MUIAlert, Snackbar as MUISnackbar } from "@mui/material";
import { ReactNode } from "react";

const NotificationTypes = {
  Success: "success",
  Error: "error",
  Info: "info",
} as const;

export type NotificationType = TypeOfConst<typeof NotificationTypes>;

export interface NotificationProps {
  readonly isOpen?: boolean;
  readonly message?: ReactNode | string;
  readonly type: NotificationType;
  readonly onClose: VoidFunction;
}

type MUIAlertProps = Props<typeof MUIAlert>;

const SNACK_BAR_TYPE_SEVERITIES: Partial<
  Record<NotificationType, MUIAlertProps["severity"]>
> = {
  success: "success",
  error: "error",
  info: "info",
};

export function Notification(props: NotificationProps) {
  return (
    <MUISnackbar
      open={props.isOpen}
      autoHideDuration={6000}
      onClose={props.onClose}
    >
      <MUIAlert
        onClose={props.onClose}
        variant="filled"
        sx={{ width: "100%" }}
        severity={SNACK_BAR_TYPE_SEVERITIES[props.type]}
      >
        {props.message}
      </MUIAlert>
    </MUISnackbar>
  );
}
