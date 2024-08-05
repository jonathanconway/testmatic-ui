import { projectUpdateTag, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTagTitleFn } from "../../../entities";
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

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTag({
      project,
      lookupTagNameOrTitle: lookupTagName,
      updatedTag,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated tag title",
  );
};
