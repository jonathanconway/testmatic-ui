import { projectUpdateTest, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestDescriptionFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const updateTestDescription: UpdateTestDescriptionFn = async (
  lookupTestName: string,
  newTestDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTest({
      project,
      lookupTestNameOrTitle: lookupTestName,
      updateTestChanges: {
        description: newTestDescription,
      },
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated test description",
  );
};
