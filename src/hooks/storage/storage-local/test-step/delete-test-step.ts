import { isError } from "lodash";
import { projectDeleteTestStep } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from "../../../../shared";
import { DeleteTestStepFn } from "../../../entities";
import { resultError, resultOk } from "../../../result";

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

  if (isError(updatedProject)) {
    return resultError(updatedProject);
  }

  saveProjectToLocalStorage(updatedProject);

  return resultOk();
};
