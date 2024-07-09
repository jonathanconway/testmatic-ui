import { isError } from "lodash";
import { projectUpdateTest } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { UpdateTestDescriptionFn } from "../../../test";

export const updateTestDescription: UpdateTestDescriptionFn = async (
  lookupTestName: string,
  newTestDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  const test = project.testsByName[lookupTestName];

  const updatedTest = {
    ...test,
    description: newTestDescription,
  };

  const projectUpdateTestResult = projectUpdateTest({
    project,
    testName: lookupTestName,
    updatedTest,
  });

  if (isError(projectUpdateTestResult)) {
    return resultError(projectUpdateTestResult);
  }

  const updatedProject = projectUpdateTestResult;

  saveProjectLocalStorage(updatedProject);

  return resultOk();
};
