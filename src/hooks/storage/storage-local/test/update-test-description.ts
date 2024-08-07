import { projectUpdateTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestDescriptionFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const updateTestDescription: UpdateTestDescriptionFn = async (
  lookupTestName: string,
  newTestDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectUpdateTest({
    project,
    lookupTestNameOrTitle: lookupTestName,
    updateTestChanges: {
      description: newTestDescription,
    },
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated test description",
  );
};
