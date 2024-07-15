import { responseToResult } from "../../../response";
import { UpdateTestRunStepStatusFn } from "../../../test-run";

import { testRunStepIsCompletedPatch } from "./test-run-step-is-completed-patch.http";

export const updateTestRunStepIsCompleted: UpdateTestRunStepStatusFn = async (
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
  lookupStepIndex: number,
  stepIsCompleted: boolean,
) => {
  return responseToResult(
    await testRunStepIsCompletedPatch({
      lookupTestNameOrTitle,
      lookupRunDateTime,
      lookupStepIndex,
      stepIsCompleted,
    }),
  );
};
