import { isNotNil } from "./types";

export function sentenceCase(input = "") {
  input = input.replaceAll("_", " ").split(" ").filter(isNotNil).join(" ");
  const a = input.substring(0, 1).toUpperCase();
  const b = input.substring(1).toLowerCase();
  return `${a}${b}`;
}
