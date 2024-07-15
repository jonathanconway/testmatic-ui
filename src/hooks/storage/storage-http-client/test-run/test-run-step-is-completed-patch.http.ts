import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testRunStepIsCompletedPatch({
  lookupTestNameOrTitle,
  lookupRunDateTime,
  lookupStepIndex,
  stepIsCompleted,
}: {
  readonly lookupTestNameOrTitle: string;
  readonly lookupRunDateTime: string;
  readonly lookupStepIndex: number;
  readonly stepIsCompleted: boolean;
}) {
  return fetch(
    `${SERVER_BASE_URL}/tests/${lookupTestNameOrTitle}/runs/${lookupRunDateTime}/steps/${lookupStepIndex}/is-completed`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stepIsCompleted),
    },
  );
}
