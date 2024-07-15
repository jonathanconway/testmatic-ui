import { projectUpdateTestTitle } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestTitleFn } from "../../../test";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const updateTestTitle: UpdateTestTitleFn = async (
  lookupTestName: string,
  newTestTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  return saveProjectToLocalStorageOrForwardError(
    projectUpdateTestTitle({
      project,
      lookupTestNameOrTitle: lookupTestName,
      newTestTitle,
    }),
  );
};
