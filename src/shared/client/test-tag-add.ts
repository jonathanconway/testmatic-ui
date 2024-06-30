import { SERVER_BASE_URL } from "./base";

export function testTagAdd(testId: string, tagName: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testId}/tags/${tagName}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
