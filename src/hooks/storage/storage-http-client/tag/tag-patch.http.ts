import { Test } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";
import { HttpMethods } from "../http-method";

type TagPatch = Partial<Pick<Test, "title" | "description">>;

export function tagPatch(tagName: string, tagPatch: TagPatch) {
  return fetch(`${SERVER_BASE_URL}/tags/${tagName}`, {
    method: HttpMethods.Patch,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagPatch),
  });
}
