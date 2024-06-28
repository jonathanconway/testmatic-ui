import { CreateTagParams } from "testmatic";
import { BASE_URL } from "./base";

export function tagCreate(createTagParams: CreateTagParams) {
  return fetch(`${BASE_URL}/tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTagParams),
  });
}
