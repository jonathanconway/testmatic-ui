import { BASE_URL } from "./base";

export function testTagAdd(testId: string, tagName: string) {
  return fetch(`${BASE_URL}/tests/${testId}/tags/${tagName}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
