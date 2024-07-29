import { testTagDelete } from "../../../../shared/client";
import { DeleteTagFromTestFn } from "../../../entities";
import { responseToResult } from "../../../response";

export const deleteTagFromTest: DeleteTagFromTestFn = async (
  lookupTestName,
  lookupTagName,
) => {
  const response = await testTagDelete(lookupTestName, lookupTagName);

  return responseToResult(response);
};
