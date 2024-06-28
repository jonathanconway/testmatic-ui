import { TypeOfConst } from "testmatic";

export const TextTypes = {
  Label: "label",
  Error: "error",
  NestedSubHeading: "nested-sub-heading",
};

export type TextType = TypeOfConst<typeof TextTypes>;
