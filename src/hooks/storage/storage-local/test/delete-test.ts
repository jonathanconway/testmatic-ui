import { projectDeleteTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { DeleteTestFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const deleteTest: DeleteTestFn = async (lookupTestName: string) => {
  const project = getProjectFromLocalStorage();

  const testToDelete = project.testsByName[lookupTestName];

  const updatedProject = projectDeleteTest({ project, testToDelete });

  return saveProjectToLocalStorageOrForwardError(
    updatedProject,
    "Deleted test",
  );
};
