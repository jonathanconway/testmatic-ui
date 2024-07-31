import { Test, projectAddTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const project = getProjectFromLocalStorage();

  const projectAddTestResult = projectAddTest({ project, newTest });

  return saveProjectToLocalStorageOrForwardError(
    projectAddTestResult,
    "Added new test",
  );
};
