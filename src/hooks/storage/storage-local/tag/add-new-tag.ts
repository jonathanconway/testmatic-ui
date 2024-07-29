import { Tag, projectAddTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTagFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTag: AddNewTagFn = async (newTag: Tag) => {
  const project = getProjectFromLocalStorage();

  const projectAddTagResult = projectAddTag({ project, newTag });

  return saveProjectToLocalStorageOrForwardError(projectAddTagResult);
};
