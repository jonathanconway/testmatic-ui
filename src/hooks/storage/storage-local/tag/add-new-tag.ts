import { Tag, projectAddTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTagFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const addNewTag: AddNewTagFn = async (newTag: Tag) => {
  const project = getProjectFromLocalStorage();

  const result = projectAddTag({ project, newTag });

  return saveResultProjectToLocalStorageOrForwardError(result, "Added new tag");
};
