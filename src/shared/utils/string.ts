/* eslint-disable no-extend-native */
import { isNotNil } from "./types";

declare global {
  interface String {
    sentenceCase(this: string): string;
  }
}

String.prototype.sentenceCase = function (this: string) {
  return sentenceCase(this);
};

export function sentenceCase(input = "") {
  input = input.replaceAll(/[_-]/g, " ").split(" ").filter(isNotNil).join(" ");
  const a = input.substring(0, 1).toUpperCase();
  const b = input.substring(1).toLowerCase();
  return `${a}${b}`;
}

declare global {
  interface String {
    replaceAllRecursive(
      this: string,
      searchValue: string | RegExp,
      replaceValue: string,
    ): string;
  }
}

String.prototype.replaceAllRecursive = function (
  this: string,
  searchValue: string | RegExp,
  replaceValue: string,
): string {
  return replaceAllRecursive(this, searchValue, replaceValue);
};

export function replaceAllRecursive(
  input: string,
  searchValue: string | RegExp,
  replaceValue: string,
  counter = 0,
): string {
  const output = input.replaceAll(searchValue, replaceValue);

  // eslint-disable-next-line eqeqeq
  if (output == input) {
    return output;
  }

  if (counter > 10_000) {
    throw new Error("Recursive replace retry limit exceeded.");
  }

  return replaceAllRecursive(output, searchValue, replaceValue, counter + 1);
}
