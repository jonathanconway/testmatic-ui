import { isError } from "lodash";
import {
  projectUpdateTest,
  sentenceCase,
  testCreateNameFromTitle,
} from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { UpdateTestTitleFn } from "../../../test";

export const updateTestTitle: UpdateTestTitleFn = async (
  lookupTestName: string,
  newTestTitle: string,
) => {
  const project = getProjectFromLocalStorage();

  const test = project.testsByName[lookupTestName];

  const updatedTest = {
    ...test,
    name: testCreateNameFromTitle(newTestTitle),
    title: sentenceCase(newTestTitle),
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
