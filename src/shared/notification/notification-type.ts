import { TypeOfConst } from "../utils";

export const NotificationTypes = {
  Success: "success",
  Error: "error",
  Info: "info",
} as const;

export type NotificationType = TypeOfConst<typeof NotificationTypes>;
