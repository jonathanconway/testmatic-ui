import { CreateTagParams } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function tagPost(params: CreateTagParams) {
  return fetch(`${SERVER_BASE_URL}/tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}
