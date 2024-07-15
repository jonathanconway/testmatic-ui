import { projectDeleteTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTagFn } from "../../../tag";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTag: DeleteTagFn = async (lookupTagName: string) => {
  const project = getProjectFromLocalStorage();

  const updatedProject = projectDeleteTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
  });

  return saveProjectToLocalStorageOrForwardError(updatedProject);
};
