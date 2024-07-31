import { projectDeleteTestTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTagFromTestFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTagFromTest: DeleteTagFromTestFn = async (
  lookupTestNameOrTitle: string,
  lookupTagNameOrTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const updatedProject = projectDeleteTestTag({
    project,
    lookupTestNameOrTitle,
    lookupTagNameOrTitle,
  });

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Removed tag from test",
  );
};
