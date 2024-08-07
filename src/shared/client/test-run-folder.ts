import { SERVER_BASE_URL } from "./base";

export function testRunFolderOpen(testName: string, dateTime: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/runs/${dateTime}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
