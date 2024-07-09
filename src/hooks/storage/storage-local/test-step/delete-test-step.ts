import { isError } from "lodash";
import { projectDeleteTestStep } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { DeleteTestStepFn } from "../../../test-step";

export const deleteTestStep: DeleteTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
) => {
  const project = getProjectFromLocalStorage();

  const projectUpdateTestStepResult = projectDeleteTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
  });

  if (isError(projectUpdateTestStepResult)) {
    return resultError(projectUpdateTestStepResult);
  }

  const updatedProject = projectUpdateTestStepResult;

  saveProjectLocalStorage(updatedProject);

  return resultOk();
};
