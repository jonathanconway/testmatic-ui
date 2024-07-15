import { isError } from "lodash";
import {
  Tag,
  isAlreadyExistsError,
  projectAddTestTag,
  projectDeleteTestTag,
  projectGetOrCreateTagByName,
} from "testmatic";

import { useProject } from "../../../hooks";
import { showErrorNotification } from "../../notification";
import { useEditingTest } from "../use-editing-test.hook";

export function useTestEditorTags() {
  const { test } = useEditingTest();

  const { project, saveProject } = useProject();

  const tags = test?.tags ?? [];

  const handleAddItem = (newItem: string) => {
    if (!project || !test) {
      return;
    }

    const tag = projectGetOrCreateTagByName(project?.tagsByName ?? {})(newItem);

    const updatedProject = projectAddTestTag({
      project,
      tag,
      lookupTestNameOrTitle: test.name,
    });

    if (isAlreadyExistsError(updatedProject)) {
      showErrorNotification(updatedProject);
      return;
    }

    saveProject(updatedProject);
  };

  const handleItemDeleteClick = (tag: Tag) => () => {
    if (!project || !test) {
      return;
    }

    const projectDeleteTestTagResult = projectDeleteTestTag({
      project,
      test,
      tag,
    });

    if (isError(projectDeleteTestTagResult)) {
      showErrorNotification(projectDeleteTestTagResult);
      return;
    }

    const updatedProject = projectDeleteTestTagResult;

    saveProject(updatedProject);
  };

  return {
    tags,
    handleAddItem,
    handleItemDeleteClick,
  };
}
