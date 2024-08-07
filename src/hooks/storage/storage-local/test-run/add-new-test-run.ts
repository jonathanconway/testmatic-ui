import { Run, projectAddTestRun } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestRunFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const addNewTestRun: AddNewTestRunFn = async (
  lookupTestName: string,
  newRun: Run,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectAddTestRun({
    project,
    lookupTestNameOrTitle: lookupTestName,
    newRun,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Added new test run",
  );
};
