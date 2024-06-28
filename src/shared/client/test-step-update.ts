import { BASE_URL } from "./base";

export function testStepUpdate(
  testId: string,
  stepIndex: number,
  stepText: string
) {
  return fetch(`${BASE_URL}/tests/${testId}/step/${stepIndex}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
