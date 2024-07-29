import { UpdateTestStepFn } from "../../../entities";
import { responseToResult } from "../../../response";

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
