import { projectUpdateTestRunStepCompleted } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestRunStepIsCompletedFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../../storage-local";

export const updateTestRunStepIsCompleted: UpdateTestRunStepIsCompletedFn =
  async (
    lookupTestNameOrTitle: string,
    lookupRunDateTime: string,
    lookupStepIndex: number,
    updatedStepIsCompleted: boolean,
  ) => {
    const project = getProjectFromLocalStorage();

    const updatedProject = projectUpdateTestRunStepCompleted({
      project,
      lookupTestNameOrTitle,
      lookupRunDateTime,
      lookupStepIndex,
      updatedStepIsCompleted,
    });

    return saveProjectToLocalStorageOrForwardError(updatedProject);
  };
