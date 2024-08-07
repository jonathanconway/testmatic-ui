import { projectUpdateTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestStepFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const updateTestStep: UpdateTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
  updatedStepText: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectUpdateTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
    updatedStepText,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated test step",
  );
};
