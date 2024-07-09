import { resultError, resultOk } from "../../../result";
import { UpdateTagDescriptionFn } from "../../../tag";

import { tagPatch } from "./tag-patch.http";

export const updateTagDescription: UpdateTagDescriptionFn = async (
  lookupTagName: string,
  newTagDescription: string,
) => {
  const response = await tagPatch(lookupTagName, {
    description: newTagDescription,
  });

  if (response.ok) {
    return resultOk();
  } else {
    return resultError(await response.json());
  }
};
