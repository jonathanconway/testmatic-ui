import { showNotification } from "./show-notification";

export function showErrorNotification(error: Error) {
  showNotification({
    message: error.message,
    type: "error",
  });
}
