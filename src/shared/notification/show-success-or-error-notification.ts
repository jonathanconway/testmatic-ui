import { isError } from "lodash";

import { showErrorNotification } from "./show-error-notification";
import { ShowNotificationParams } from "./show-notification";
import { showSuccessNotification } from "./show-success-notification";

export function showSuccessOrErrorNotification<T extends object | Error>(
  input: T,
  options?: ShowNotificationParams,
) {
  if (isError(input)) {
    showErrorNotification(input, options);
    return;
  }

  showSuccessNotification(undefined, options);
}
