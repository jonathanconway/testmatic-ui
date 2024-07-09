import { SERVER_BASE_URL } from "./base";

export function testStepDelete(testName: string, stepIndex: number) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/step/${stepIndex}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
