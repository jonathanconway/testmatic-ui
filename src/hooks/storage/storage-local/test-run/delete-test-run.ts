import { projectDeleteRun, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestRunFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTestRun: DeleteTestRunFn = async (
  lookupTestName: string,
  lookupRunDateTime: string,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectDeleteRun({
      project,
      lookupTestNameOrTitle: lookupTestName,
      lookupRunDateTime,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Deleted test run",
  );
};
