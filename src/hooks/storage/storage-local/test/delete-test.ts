import { projectDeleteTest, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTest: DeleteTestFn = async (
  lookupTestNameOrTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectDeleteTest({ project, lookupTestNameOrTitle }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Deleted test",
  );
};
