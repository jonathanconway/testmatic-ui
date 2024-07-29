import { projectUpdateTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestDescriptionFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const updateTestDescription: UpdateTestDescriptionFn = async (
  lookupTestName: string,
  newTestDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  return saveProjectToLocalStorageOrForwardError(
    projectUpdateTest({
      project,
      lookupTestNameOrTitle: lookupTestName,
      updateTestChanges: {
        description: newTestDescription,
      },
    }),
  );
};
