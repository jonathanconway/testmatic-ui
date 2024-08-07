import { projectUpdateTestRunStepCompleted } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestRunStepIsCompletedFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../../storage-local";

export const updateTestRunStepIsCompleted: UpdateTestRunStepIsCompletedFn =
  async (
    lookupTestNameOrTitle: string,
    lookupRunDateTime: string,
    lookupStepIndex: number,
    updatedStepIsCompleted: boolean,
  ) => {
    const project = getProjectFromLocalStorage();

    const result = projectUpdateTestRunStepCompleted({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
      lookupStepIndex,
      updatedStepIsCompleted,
    });

    return saveResultProjectToLocalStorageOrForwardError(
      result,
      "Updated run step status",
    );
  };
