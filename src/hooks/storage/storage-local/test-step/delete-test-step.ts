import { projectDeleteTestStep, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestStepFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTestStep: DeleteTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectDeleteTestStep({
      project,
      lookupTestNameOrTitle: lookupTestName,
      lookupStepIndex,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Deleted test step",
  );
};
