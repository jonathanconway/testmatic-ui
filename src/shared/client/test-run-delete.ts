import { SERVER_BASE_URL } from "./base";

export function testRunDelete(testId: string, dateTime: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testId}/runs/${dateTime}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
