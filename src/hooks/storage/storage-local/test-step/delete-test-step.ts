import { projectDeleteTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestStepFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTestStep: DeleteTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
) => {
  const project = getProjectFromLocalStorage();

  const updatedProject = projectDeleteTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
  });

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Deleted test step",
  );
};
