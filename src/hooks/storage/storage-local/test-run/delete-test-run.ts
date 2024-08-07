import { projectDeleteRun } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestRunFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const deleteTestRun: DeleteTestRunFn = async (
  lookupTestName: string,
  lookupRunDateTime: string,
) => {
  const project = getProjectFromLocalStorage();

  const result = projectDeleteRun({
    project,
    lookupTestNameOrTitle: lookupTestName,
    lookupRunDateTime,
  });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Deleted test run",
  );
};
