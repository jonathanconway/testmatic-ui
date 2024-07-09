import { Test } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";

type TestPatch = Partial<Pick<Test, "title" | "description">>;

export function testPatch(testName: string, testPatch: TestPatch) {
  return fetch(`${SERVER_BASE_URL}/tests/${testName}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testPatch),
  });
}
