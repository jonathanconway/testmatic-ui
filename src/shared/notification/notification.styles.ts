import styled from "styled-components";

import { NotificationSize } from "./notification-size";
import { NotificationType, NotificationTypes } from "./notification-type";

export interface NotificationBoxAttrs {
  readonly $size: NotificationSize;
  readonly $type: NotificationType;
}

export const NotificationBox = styled.div<NotificationBoxAttrs>`
  border: solid 1px green;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 1px 2px 15px 1px #dedede;
  font-size: 0.85rem;
  cursor: default;

  ${notificationBoxTypeStyles}
`;

function notificationBoxTypeStyles(attrs: NotificationBoxAttrs) {
  return {
    [NotificationTypes.Success]: `
    background-color: #ccffcc;
    border-color: green;
  `,
    [NotificationTypes.Error]: `
    background-color: #ffcccc;
    border-color: red;
  `,
    [NotificationTypes.Info]: `
    background-color: #e6f7ff;
    border-color: blue;
  `,
  }[attrs.$type];
}
