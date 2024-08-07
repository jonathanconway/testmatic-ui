import { projectUpdateTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagDescriptionFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const updateTagDescription: UpdateTagDescriptionFn = async (
  lookupTagName: string,
  newTagDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  const tag = project.tagsByName[lookupTagName];

  const updatedTag = {
    ...tag,
    description: newTagDescription,
  };

  const result = projectUpdateTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
    updatedTag,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated tag description",
  );
};
