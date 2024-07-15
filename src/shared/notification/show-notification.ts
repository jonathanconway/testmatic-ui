import { ReactNode } from "react";

import { NotificationType } from "./notification-type";

export interface ShowNotificationParams {
  readonly message?: ReactNode | string;
  readonly type?: NotificationType;
  readonly anchorElement?: HTMLElement | null;
  readonly anchorDOMRect?: DOMRect | null;
  readonly duration?: number;
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
  console.log("showNotification", params?.anchorElement);
  window.dispatchEvent(new ShowNotificationEvent(params));
}

(window as any).showNotification = showNotification;
