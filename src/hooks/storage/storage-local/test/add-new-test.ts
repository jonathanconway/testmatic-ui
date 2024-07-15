import { isError } from "lodash";
import { Test, projectAddTest } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { AddNewTestFn } from "../../../test";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const project = getProjectFromLocalStorage();

  const projectAddTestResult = projectAddTest({ project, newTest });

  if (isError(projectAddTestResult)) {
    return resultError(projectAddTestResult);
  }

  const updatedProject = projectAddTestResult;

  saveProjectToLocalStorage(updatedProject);

  return resultOk();
};
