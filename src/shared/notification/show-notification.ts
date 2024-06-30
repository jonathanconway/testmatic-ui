import { ReactNode } from "react";

import { NotificationType } from "./notification";

export interface ShowNotificationParams {
  readonly message?: ReactNode | string;
  readonly type?: NotificationType;
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
