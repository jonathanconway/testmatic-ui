import { PopoverButton } from "../../../../popover";

import { ImportPopover } from "./import-popover";

export function ImportButton() {
  return <PopoverButton renderPopover={ImportPopover}>Import</PopoverButton>;
}
