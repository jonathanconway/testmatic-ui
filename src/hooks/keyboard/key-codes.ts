import { TypeOfConst } from "../../shared";

export const KeyCodes = {
  Escape: "Escape",
  Tab: "Tab",
  Enter: "Enter",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
};

export type KeyCode = TypeOfConst<typeof KeyCodes>;
