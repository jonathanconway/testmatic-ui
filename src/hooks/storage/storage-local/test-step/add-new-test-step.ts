import {
  createTestStepFromText,
  projectAddNewTestStep,
  throwIfResultWithDataError,
} from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestStepFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTestStep: AddNewTestStepFn = async (
  lookupTestNameOrTitle: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => {
  const project = getProjectFromLocalStorage();

  const newStep = createTestStepFromText(newTestStepText);

  const { data: updatedProject } = throwIfResultWithDataError(
    projectAddNewTestStep({
      project,
      lookupTestNameOrTitle,
      newStep,
      lookupBeforeStepIndex,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Added new test step",
  );
};
