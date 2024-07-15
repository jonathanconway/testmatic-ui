import { RunResult } from "testmatic";

import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testRunStepResultPatch({
  lookupTestNameOrTitle,
  lookupRunDateTime,
  updatedRunResult,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
  readonly updatedRunResult: RunResult;
}) {
  return fetch(
    `${SERVER_BASE_URL}/tests/${lookupTestNameOrTitle}/runs/${lookupRunDateTime}/result`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRunResult),
    },
  );
}
