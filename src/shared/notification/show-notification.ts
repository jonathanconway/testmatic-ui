import { ReactNode } from "react";

import { NotificationFormat } from "./notification-format";
import { NotificationType } from "./notification-type";

export interface ShowNotificationParams {
  readonly message?: ReactNode | string;
  readonly type?: NotificationType;
  readonly anchorElement?: HTMLElement | null;
  readonly anchorDOMRect?: DOMRect | null;
  readonly duration?: number;
  readonly format?: NotificationFormat;
  readonly offset?: NotificationOffset;
}

interface NotificationOffset {
  readonly top?: number;
  readonly left?: number;
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
