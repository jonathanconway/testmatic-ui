import { responseToResult } from "../../../response";
import { DeleteTagFn } from "../../../tag";

import { tagDelete } from "./tag-delete.http";

export const deleteTag: DeleteTagFn = async (lookupTagName: string) => {
  const response = await tagDelete(lookupTagName);

  return responseToResult(response);
};
