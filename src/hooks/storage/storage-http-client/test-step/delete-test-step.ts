import { responseToResult } from "../../../response";
import { DeleteTestStepFn } from "../../../test-step";

import { testStepDelete } from "./test-step-delete.http";

export const deleteTestStep: DeleteTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
) => {
  return responseToResult(
    await testStepDelete(lookupTestName, lookupStepIndex),
  );
};
