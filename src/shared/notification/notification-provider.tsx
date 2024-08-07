import { useEffect, useState } from "react";

import { timeout } from "../utils";

import { Notification } from "./notification";
import {
  ShowNotificationEvent,
  ShowNotificationParams,
} from "./show-notification";

type NotificationProviderState = ShowNotificationParams & {
  readonly isOpen: boolean;
};

export function NotificationProvider() {
  const [state, setState] = useState<NotificationProviderState>({
    isOpen: false,
  });

  useEffect(() => {
    const listener = async (event: ShowNotificationEvent) => {
      // Close then re-open, in case notification is rapidly re-triggered.
      setState({
        isOpen: false,
      });

      await timeout();

      setState(() => ({
        isOpen: true,
        ...event.params,
      }));
    };

    window.addEventListener(ShowNotificationEvent.type, listener);

    return () => {
      window.removeEventListener(ShowNotificationEvent.type, listener);
    };
  }, []);

  const handleClose = () => {
    setState({
      isOpen: false,
    });
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
