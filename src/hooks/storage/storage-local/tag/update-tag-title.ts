import { projectUpdateTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagTitleFn } from "../../../tag";
import { saveProjectToLocalStorageOrForwardError } from "../project";

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

  const updatedProject = projectUpdateTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
    updatedTag,
  });

  return saveProjectToLocalStorageOrForwardError(updatedProject);
};
