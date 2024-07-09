import { SERVER_BASE_URL } from "./base";

export function testTagDelete(testName: string, tagName: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/tags/${tagName}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
