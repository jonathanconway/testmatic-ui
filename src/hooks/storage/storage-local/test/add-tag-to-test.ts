import { createTagFromName, projectAddTestTag } from "testmatic";

import { getProjectFromLocalStorage } from "../../../../shared";
import { AddTagToTestFn } from "../../../entities";
import { saveProjectToLocalStorageOrForwardError } from "../project";

export const addTagToTest: AddTagToTestFn = async (
  lookupTestName: string,
  newOrLookupTagName: string,
) => {
  const project = getProjectFromLocalStorage();

  const newTag =
    project.tagsByName[newOrLookupTagName] ??
    createTagFromName(newOrLookupTagName);

  const updatedProject = projectAddTestTag({
    project,
    lookupTestNameOrTitle: lookupTestName,
    newTag,
  });

  return saveProjectToLocalStorageOrForwardError(updatedProject);
};
