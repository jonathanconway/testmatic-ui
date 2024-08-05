import {
  RunResult,
  projectUpdateTestRunResult,
  throwIfResultWithDataError,
} from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestRunResultFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../../storage-local";

export const updateTestRunResult: UpdateTestRunResultFn = async (
  lookupTestNameOrTitle: string,
  lookupRunDateTime: string,
  updateRunResult: RunResult,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTestRunResult({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
      updateRunResult,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated run result",
  );
};
