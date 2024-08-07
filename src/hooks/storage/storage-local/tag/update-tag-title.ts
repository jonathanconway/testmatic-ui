import { projectUpdateTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagTitleFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const updateTagTitle: UpdateTagTitleFn = async (
  lookupTagName: string,
  newTagTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const tag = project.tagsByName[lookupTagName];

  const updatedTag = {
    ...tag,
    title: newTagTitle,
  };

  const result = projectUpdateTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
    updatedTag,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated tag title",
  );
};
