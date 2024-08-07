import { projectDeleteTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const deleteTest: DeleteTestFn = async (
  lookupTestNameOrTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectDeleteTest({ project, lookupTestNameOrTitle });

  return saveResultProjectToLocalStorageOrForwardError(result, "Deleted test");
};
