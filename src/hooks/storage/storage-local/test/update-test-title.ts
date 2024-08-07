import { projectUpdateTestTitle } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { UpdateTestTitleFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const updateTestTitle: UpdateTestTitleFn = async (
  lookupTestName: string,
  newTestTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectUpdateTestTitle({
    project,
    lookupTestNameOrTitle: lookupTestName,
    newTestTitle,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Updated test title",
  );
};
