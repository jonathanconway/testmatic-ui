import { projectUpdateTestTitle, throwIfResultWithDataError } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestTitleFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const updateTestTitle: UpdateTestTitleFn = async (
  lookupTestName: string,
  newTestTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const { data: updatedProject } = throwIfResultWithDataError(
    projectUpdateTestTitle({
      project,
      lookupTestNameOrTitle: lookupTestName,
      newTestTitle,
    }),
  );

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Updated test title",
  );
};
