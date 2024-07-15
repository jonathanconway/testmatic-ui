import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testStepPost(
  testName: string,
  stepText: string,
  stepIndex?: number,
) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/steps/${stepIndex}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
