import { NotificationTypes } from "./notification-type";
import { ShowNotificationParams, showNotification } from "./show-notification";

export function showErrorNotification(
  error: Error,
  options?: ShowNotificationParams,
) {
  showNotification({
    message: error.message,
    type: NotificationTypes.Error,
    ...options,
  });
}
