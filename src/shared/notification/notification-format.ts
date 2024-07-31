import { TypeOfConst } from "../utils";

export const NotificationFormats = {
  Message: "message",
  Icon: "icon",
} as const;

export type NotificationFormat = TypeOfConst<typeof NotificationFormats>;
