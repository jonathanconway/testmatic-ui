import { createTestStepFromText, projectAddTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestStepFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTestStep: AddNewTestStepFn = async (
  lookupTestName: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => {
  const project = getProjectFromLocalStorage();

  const newStep = createTestStepFromText(newTestStepText);

  const updatedProject = projectAddTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    newStep,
    lookupBeforeStepIndex,
  });

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Added new test step",
  );
};
