import { Tag, projectAddTag, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTagFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTag: AddNewTagFn = async (newTag: Tag) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectAddTag({ project, newTag }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Added new tag",
  );
};
