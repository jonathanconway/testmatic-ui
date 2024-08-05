import { projectUpdateTag, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagDescriptionFn } from "../../../entities";
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

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTag({
      project,
      lookupTagNameOrTitle: lookupTagName,
      updatedTag,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated tag description",
  );
};
