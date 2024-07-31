import { DeleteTestRunFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { testRunDelete } from "./test-run-delete.http";

export const deleteTestRun: DeleteTestRunFn = async (
  lookupTestName: string,
  lookupRunDateTime: string,
) => {
  return responseToResult(
    await testRunDelete(lookupTestName, lookupRunDateTime),
  );
};
