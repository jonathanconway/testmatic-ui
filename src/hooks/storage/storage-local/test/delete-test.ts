import { isError } from "lodash";
import { projectDeleteTest } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { DeleteTestFn } from "../../../test";

export const deleteTest: DeleteTestFn = async (lookupTestName: string) => {
  const project = getProjectFromLocalStorage();

  const testToDelete = project.testsByName[lookupTestName];

  const updatedProject = projectDeleteTest({ project, testToDelete });

  if (isError(updatedProject)) {
    return resultError(updatedProject);
  }

  saveProjectToLocalStorage(updatedProject);

  return resultOk();
};
