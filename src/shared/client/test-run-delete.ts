import { BASE_URL } from "./base";

export function testRunDelete(testId: string, dateTime: string) {
  return fetch(`${BASE_URL}/tests/${testId}/runs/${dateTime}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
