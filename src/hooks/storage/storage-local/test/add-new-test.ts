import { Test, projectAddNewTest } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddNewTestFn } from "../../../entities";
import { saveResultProjectToLocalStorageOrForwardError } from "../project";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const project = getProjectFromLocalStorage();

  const result = projectAddNewTest({ project, newTest });

  return saveResultProjectToLocalStorageOrForwardError(
    result,
    "Added new test",
  );
};
