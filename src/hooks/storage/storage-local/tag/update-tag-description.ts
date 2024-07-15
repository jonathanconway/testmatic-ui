import { projectUpdateTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagDescriptionFn } from "../../../tag";
import { saveProjectToLocalStorageOrForwardError } from "../project";

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

  const updatedProject = projectUpdateTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
    updatedTag,
  });

  return saveProjectToLocalStorageOrForwardError(updatedProject);
};
