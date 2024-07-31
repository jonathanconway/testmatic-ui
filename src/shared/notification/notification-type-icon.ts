import { IconNames } from "../icon";

import { NotificationTypes } from "./notification-type";

export const NotificationTypeIcons = {
  [NotificationTypes.Success]: IconNames.Passed,
  [NotificationTypes.Error]: IconNames.Failed,
  [NotificationTypes.Info]: IconNames.Info,
};
