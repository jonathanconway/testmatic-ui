import { isError } from "lodash";
import {
  Tag,
  Test,
  isAlreadyExistsError,
  projectAddTestTag,
  projectDeleteTestTag,
  projectGetOrCreateTagByName,
} from "testmatic";

import { showErrorNotification } from "../../notification";
import { useProject } from "../../project";

interface UseTestEditorTagsParams {
  readonly test: Test;
}

export function useTestEditorTags(params: UseTestEditorTagsParams) {
  const { project, saveProject } = useProject();

  const handleAddItem = (newItem: string) => {
    if (!project) {
      return;
    }

    const { test } = params;

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
    if (!project) {
      return;
    }

    const { test } = params;

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
    handleAddItem,
    handleItemDeleteClick,
  };
}
