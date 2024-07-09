import { Test } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";

type TagPatch = Partial<Pick<Test, "description">>;

export function tagPatch(tagName: string, tagPatch: TagPatch) {
  return fetch(`${SERVER_BASE_URL}/tags/${tagName}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagPatch),
  });
}
