import { responseToResult } from "../../../response";
import { UpdateTestDescriptionFn } from "../../../test";

import { testPatch } from "./test-patch.http";

export const updateTestDescription: UpdateTestDescriptionFn = async (
  lookupTestName: string,
  newTestDescription: string,
) => {
  return responseToResult(
    await testPatch(lookupTestName, {
      description: newTestDescription,
    }),
  );
};
