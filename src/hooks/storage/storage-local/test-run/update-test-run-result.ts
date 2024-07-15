import { RunResult, projectUpdateTestRunResult } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestRunResultFn } from "../../../test-run";
import { saveProjectToLocalStorageOrForwardError } from "../../storage-local";

export const updateTestRunResult: UpdateTestRunResultFn = async (
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
  updateRunResult: RunResult,
) => {
  const project = getProjectFromLocalStorage();

  const updatedProject = projectUpdateTestRunResult({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunResult,
  });

  return saveProjectToLocalStorageOrForwardError(updatedProject);
};
