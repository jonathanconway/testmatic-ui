import { TypeOfConst } from "../utils";

export const IconNames = {
  Edit: "edit",
  Delete: "delete",
} as const;

export type IconName = TypeOfConst<typeof IconNames>;
