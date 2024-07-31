import { useMemo } from "react";

import { NotificationSize } from "./notification-size";
import { NotificationType, NotificationTypes } from "./notification-type";
import { ShowNotificationParams } from "./show-notification";

export interface UseNotificationParams extends ShowNotificationParams {
  readonly isOpen?: boolean;

  readonly onClose: VoidFunction;
}

export interface UseNotificationResult {
  readonly anchorRelativePosition?: {
    readonly left: number;
    readonly top: number;
    readonly height: string;
  };
  readonly size: NotificationSize;
  readonly type: NotificationType;
}

export function useNotification(
  params: UseNotificationParams,
): UseNotificationResult {
  const anchorRelativePosition = useMemo(() => {
    if (!params.anchorElement && !params.anchorDOMRect) return;

    const bodyRect = document.body.getBoundingClientRect();
    const anchorElementRect =
      params.anchorElement?.getBoundingClientRect() ??
      (params.anchorDOMRect as DOMRect);
    const anchorElementTop = anchorElementRect.top - bodyRect.top;

    const left = anchorElementRect.left + (params.offset?.left ?? 0);
    const top =
      anchorElementTop +
      (params.anchorElement?.offsetHeight ?? 15) +
      10 +
      (params.offset?.top ?? 0);

    return {
      left,
      top,
      height: "1rem",
    };
  }, [params.anchorDOMRect, params.anchorElement]);

  const size = params.anchorElement ? "small" : "normal";
  const type = params.type ?? NotificationTypes.Info;

  return {
    anchorRelativePosition,
    size,
    type,
  };
}
