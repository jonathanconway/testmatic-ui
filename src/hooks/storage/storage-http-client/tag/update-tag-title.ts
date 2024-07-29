import { responseToResult } from "../../../response";
import { UpdateTagTitleFn } from "../../../tag";

import { tagPatch } from "./tag-patch.http";

export const updateTagTitle: UpdateTagTitleFn = async (
  lookupTagName: string,
  newTagTitle: string,
) => {
  const response = await tagPatch(lookupTagName, {
    title: newTagTitle,
  });

  return responseToResult(response);
};
