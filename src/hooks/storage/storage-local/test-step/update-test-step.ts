import { isError } from "lodash";
import { projectUpdateTestStep } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { UpdateTestStepFn } from "../../../test-step";

export const updateTestStep: UpdateTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
  updatedStepText: string,
) => {
  const project = getProjectFromLocalStorage();

  const projectUpdateTestStepResult = projectUpdateTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
    updatedStepText,
  });

  if (isError(projectUpdateTestStepResult)) {
    return resultError(projectUpdateTestStepResult);
  }

  const updatedProject = projectUpdateTestStepResult;

  saveProjectToLocalStorage(updatedProject);

  return resultOk();
};
