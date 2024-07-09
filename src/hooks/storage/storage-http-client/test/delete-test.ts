import { isError } from "lodash";
import { projectDeleteTest } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { DeleteTestFn } from "../../../test";

export const deleteTest: DeleteTestFn = (lookupTestName: string) => {
  const project = getProjectFromLocalStorage();

  const testToDelete = project.testsByName[lookupTestName];

  const projectDeleteTestResult = projectDeleteTest({ project, testToDelete });

  if (isError(projectDeleteTestResult)) {
    return resultError(projectDeleteTestResult);
  }

  const updatedProject = projectDeleteTestResult;

  saveProjectLocalStorage(updatedProject);

  return resultOk();
};
