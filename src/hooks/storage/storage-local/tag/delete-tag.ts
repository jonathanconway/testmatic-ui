import { projectDeleteTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTagFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const deleteTag: DeleteTagFn = async (lookupTagName: string) => {
  const project = getProjectFromLocalStorage();

  const result = projectDeleteTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
  });

  return saveResultProjectToLocalStorageOrForwardError(result, "Deleted tag");
};
