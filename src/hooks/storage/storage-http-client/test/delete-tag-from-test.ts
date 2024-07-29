import { testTagDelete } from "../../../../shared/client";
import { responseToResult } from "../../../response";
import { DeleteTagFromTestFn } from "../../../test";

export const deleteTagFromTest: DeleteTagFromTestFn = async (
  lookupTestName,
  lookupTagName,
) => {
  const response = await testTagDelete(lookupTestName, lookupTagName);

  return responseToResult(response);
};
