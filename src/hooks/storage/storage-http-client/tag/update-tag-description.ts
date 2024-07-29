import { UpdateTagDescriptionFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { tagPatch } from "./tag-patch.http";

export const updateTagDescription: UpdateTagDescriptionFn = async (
  lookupTagName: string,
  newTagDescription: string,
) => {
  const response = await tagPatch(lookupTagName, {
    description: newTagDescription,
  });

  return responseToResult(response);
};
