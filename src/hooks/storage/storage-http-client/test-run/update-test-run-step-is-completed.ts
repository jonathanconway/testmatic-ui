import { UpdateTestRunStepIsCompletedFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { testRunStepIsCompletedPatch } from "./test-run-step-is-completed-patch.http";

export const updateTestRunStepIsCompleted: UpdateTestRunStepIsCompletedFn =
  async (
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
