import { PopupButton } from "../../../../popup";

import { ImportPopup } from "./import-popup";

export function ImportButton() {
  return <PopupButton renderPopup={ImportPopup}>Import</PopupButton>;
}
