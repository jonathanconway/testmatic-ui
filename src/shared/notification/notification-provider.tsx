import { useEffect, useState } from "react";

import { Notification } from "./notification";
import {
  ShowNotificationEvent,
  ShowNotificationParams,
} from "./show-notification";

export function NotificationProvider() {
  const [state, setState] = useState<ShowNotificationParams>();

  useEffect(() => {
    const listener = (event: ShowNotificationEvent) => {
      setState(event.params);
    };

    window.addEventListener(ShowNotificationEvent.type, listener);

    return () => {
      window.removeEventListener(ShowNotificationEvent.type, listener);
    };
  }, []);

  const handleClose = () => {
    setState(undefined);
  };

  if (!state) {
    return null;
  }

  return (
    <Notification
      {...state}
      isOpen
      type={state.type ?? "info"}
      onClose={handleClose}
    />
  );
}
