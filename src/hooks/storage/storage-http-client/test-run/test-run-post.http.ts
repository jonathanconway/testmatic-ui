import { Run } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testRunPost(lookupTestName: string, newRun: Run) {
  return fetch(`${SERVER_BASE_URL}/tests/${lookupTestName}/runs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRun),
  });
}
