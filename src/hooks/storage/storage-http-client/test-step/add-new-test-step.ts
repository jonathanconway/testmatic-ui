import { responseToResult } from "../../../response";
import { AddNewTestStepFn } from "../../../test-step";

import { testStepPost } from "./test-step-post.http";

export const addNewTestStep: AddNewTestStepFn = async (
  lookupTestName: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => {
  return responseToResult(
    await testStepPost(lookupTestName, newTestStepText, lookupBeforeStepIndex),
  );
};
