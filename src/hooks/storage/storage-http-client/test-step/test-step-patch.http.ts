import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testStepPatch(
  testName: string,
  stepIndex: number,
  stepText: string,
) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}/steps/${stepIndex}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepText),
  });
}
