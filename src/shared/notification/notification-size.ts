import { TypeOfConst } from "../utils";

export const NotificationSizes = {
  Small: "small",
  Normal: "normal",
} as const;

export type NotificationSize = TypeOfConst<typeof NotificationSizes>;
