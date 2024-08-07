import { projectDeleteTestStep } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestStepFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const deleteTestStep: DeleteTestStepFn = async (
  lookupTestName: string,
  lookupStepIndex: number,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectDeleteTestStep({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupStepIndex,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Deleted test step",
  );
};
