import { SERVER_BASE_URL } from "./base";

export function testDelete(testName: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
