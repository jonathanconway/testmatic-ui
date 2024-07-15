import { isError } from "lodash";

export function getValueOrUndefinedIfError<T>(input: T | Error): T | undefined {
  if (isError(input)) {
    return undefined;
  }
  return input;
}
