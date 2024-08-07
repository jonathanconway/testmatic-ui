import { createTestStepFromText, projectAddNewTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestStepFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const addNewTestStep: AddNewTestStepFn = async (
  lookupTestNameOrTitle: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => {
  const project = getProjectFromLocalStorage();

  const newStep = createTestStepFromText(newTestStepText);

  const result = projectAddNewTestStep({
    project,
    lookupTestNameOrTitle,
    newStep,
    lookupBeforeStepIndex,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Added new test step",
  );
};
