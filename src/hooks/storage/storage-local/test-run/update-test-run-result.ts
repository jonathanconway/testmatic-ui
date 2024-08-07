import { RunResult, projectUpdateTestRunResult } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestRunResultFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../../storage-local";

export const updateTestRunResult: UpdateTestRunResultFn = async (
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
  updateRunResult: RunResult,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectUpdateTestRunResult({
    project,
    lookupTestNameOrTitle,
    lookupRunDateTime,
    updateRunResult,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated run result",
  );
};
