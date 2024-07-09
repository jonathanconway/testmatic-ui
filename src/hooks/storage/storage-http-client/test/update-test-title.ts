import { responseToResult } from "../../../response";
import { UpdateTestTitleFn } from "../../../test";

import { testPatch } from "./test-patch.http";

export const updateTestTitle: UpdateTestTitleFn = async (
  lookupTestName: string,
  newTestTitle: string,
) => {
  return responseToResult(
    await testPatch(lookupTestName, {
      title: newTestTitle,
    }),
  );
};
