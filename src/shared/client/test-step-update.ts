import { SERVER_BASE_URL } from "./base";

export function testStepUpdate(
  testName: string,
  stepIndex: number,
  stepText: string,
) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/step/${stepIndex}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
