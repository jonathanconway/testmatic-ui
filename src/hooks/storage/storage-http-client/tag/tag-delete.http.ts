import { SERVER_BASE_URL } from "../../../../shared/client/base";
import { HttpMethods } from "../http-method";

export function tagDelete(lookupTagName: string) {
  return fetch(`${SERVER_BASE_URL}/tags/${lookupTagName}`, {
    method: HttpMethods.Delete,
  });
}
