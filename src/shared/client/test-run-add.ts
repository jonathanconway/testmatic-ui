import { SERVER_BASE_URL } from "./base";

export function testRunAdd(testName: string, dateTime: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/runs`, {
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
