import { DeleteTagFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { tagDelete } from "./tag-delete.http";

export const deleteTag: DeleteTagFn = async (lookupTagName: string) => {
  const response = await tagDelete(lookupTagName);

  return responseToResult(response);
};
