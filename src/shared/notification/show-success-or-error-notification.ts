import { get, isError } from "lodash";

import { Result } from "../../hooks/result";

import { showErrorNotification } from "./show-error-notification";
import { ShowNotificationParams } from "./show-notification";
import { showSuccessNotification } from "./show-success-notification";

export function showSuccessOrErrorNotification<
  T extends object | Error | Result<"ok" | "error">,
>(input: T, options?: ShowNotificationParams) {
  if ("type" in input) {
    if (input.type === "error" && "error" in input && isError(input.error)) {
      showErrorNotification(input.error, options);
      return;
    }

    if (input.type === "ok") {
      showSuccessNotification(input.message, options);
      return;
    }
  }

  if (isError(input)) {
    showErrorNotification(input, options);
    return;
  }

  const inputMessage = get(input, "message") as string | undefined;
  showSuccessNotification(inputMessage, options);
}
