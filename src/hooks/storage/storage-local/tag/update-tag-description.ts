import { isError } from "lodash";
import { projectUpdateTag } from "testmatic";

import {
  getProjectFromLocalStorage,
  saveProjectLocalStorage,
} from "../../../../shared";
import { resultError, resultOk } from "../../../result";
import { UpdateTagDescriptionFn } from "../../../tag";

export const updateTagDescription: UpdateTagDescriptionFn = async (
  lookupTagName: string,
  newTagDescription: string,
) => {
  const project = getProjectFromLocalStorage();

  const tag = project.tagsByName[lookupTagName];

  const updatedTag = {
    ...tag,
    description: newTagDescription,
  };

  const projectUpdateTagResult = projectUpdateTag({
    project,
    lookupTagNameOrTitle: lookupTagName,
    updatedTag,
  });

  if (isError(projectUpdateTagResult)) {
    return resultError(projectUpdateTagResult);
  }

  const updatedProject = projectUpdateTagResult;

  if (isError(updatedProject)) {
    return resultError(updatedProject);
  }

  saveProjectLocalStorage(updatedProject);

  return resultOk();
};
