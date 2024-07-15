import { NotificationTypes } from "./notification-type";
import { ShowNotificationParams, showNotification } from "./show-notification";

export function showSuccessNotification(
  message = "Saved",
  options?: ShowNotificationParams,
) {
  showNotification({
    message,
    type: NotificationTypes.Success,
    duration: 2000,
    ...options,
  });
}
