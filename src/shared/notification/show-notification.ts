import { ReactNode } from "react";

export interface ShowNotificationParams {
  readonly message?: ReactNode | string;
  readonly type?: "success" | "error" | "info";
}

export class ShowNotificationEvent extends Event {
  static type = "shownotification";

  public params?: ShowNotificationParams;

  constructor(params?: ShowNotificationParams) {
    super(ShowNotificationEvent.type);

    this.params = params;
  }
}

export function showNotification(params?: ShowNotificationParams) {
  window.dispatchEvent(new ShowNotificationEvent(params));
}
