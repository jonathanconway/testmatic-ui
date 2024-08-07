import { projectDeleteTestTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTagFromTestFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const deleteTagFromTest: DeleteTagFromTestFn = async (
  lookupTestNameOrTitle: string,
  lookupTagNameOrTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectDeleteTestTag({
    project,
    lookupTestNameOrTitle,
    lookupTagNameOrTitle,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Removed tag from test",
  );
};
