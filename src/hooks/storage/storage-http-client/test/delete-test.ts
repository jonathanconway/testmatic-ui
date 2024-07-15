import { responseToResult } from "../../../response";
import { DeleteTestFn } from "../../../test";

import { testDelete } from "./test-delete.http";

export const deleteTest: DeleteTestFn = async (lookupTestName: string) => {
  return responseToResult(await testDelete(lookupTestName));
};
