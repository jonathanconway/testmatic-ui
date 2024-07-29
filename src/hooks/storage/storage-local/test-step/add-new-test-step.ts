import { isError } from "lodash";
import { createTestStepFromText, projectAddTestStep } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from "../../../../shared";
import { AddNewTestStepFn } from "../../../entities";
import { resultError, resultOk } from "../../../result";

export const addNewTestStep: AddNewTestStepFn = async (
  lookupTestName: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => {
  const project = getProjectFromLocalStorage();

  const newStep = createTestStepFromText(newTestStepText);

  const projectAddTestStepResult = projectAddTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    newStep,
    lookupBeforeStepIndex,
  });

  if (isError(projectAddTestStepResult)) {
    return resultError(projectAddTestStepResult);
  }

  const updatedProject = projectAddTestStepResult;

  saveProjectToLocalStorage(updatedProject);

  return resultOk();
};
