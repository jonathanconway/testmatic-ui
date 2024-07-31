import { projectUpdateTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestStepFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const updateTestStep: UpdateTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
  updatedStepText: string,
) => {
  const project = getProjectFromLocalStorage();

  const updatedProject = projectUpdateTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
    updatedStepText,
  });

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated test step",
  );
};
