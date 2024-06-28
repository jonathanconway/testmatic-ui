import { BASE_URL } from "./base";

export function testStepCreate(testId: string, stepText: string) {
  return fetch(`${BASE_URL}/tests/${testId}/step`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
