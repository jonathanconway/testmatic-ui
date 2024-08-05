import { Run, projectAddTestRun, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestRunFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTestRun: AddNewTestRunFn = async (
  lookupTestName: string,
  newRun: Run,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectAddTestRun({
      project,
      lookupTestNameOrTitle: lookupTestName,
      newRun,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Added new test run",
  );
};
