import { BASE_URL } from "./base";

export function testRunAdd(testId: string, dateTime: string) {
  return fetch(`${BASE_URL}/tests/${testId}/runs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dateTime,
    }),
  });
}
