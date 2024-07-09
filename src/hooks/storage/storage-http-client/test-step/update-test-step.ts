import { responseToResult } from "../../../response";
import { UpdateTestStepFn } from "../../../test-step/update-test-step";

import { testStepPatch } from "./test-step-patch.http";

export const updateTestStep: UpdateTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
  newStepText: string,
) => {
  return responseToResult(
    await testStepPatch(lookupTestName, lookupStepIndex, newStepText),
  );
};
