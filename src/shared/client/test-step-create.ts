import { SERVER_BASE_URL } from "./base";

export function testStepCreate(testId: string, stepText: string) {
  return fetch(`${SERVER_BASE_URL}/tests/${testId}/step`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
