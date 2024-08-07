import { RunResult } from "testmatic";

import { UpdateTestRunResultFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { testRunStepResultPatch } from "./test-run-result-patch.http";

export const updateTestRunResult: UpdateTestRunResultFn = async (
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
  updatedRunResult: RunResult,
) => {
  return responseToResult(
    await testRunStepResultPatch({
      lookupTestNameOrTitle,
      lookupRunDateTime,
      updatedRunResult,
    }),
  );
};
