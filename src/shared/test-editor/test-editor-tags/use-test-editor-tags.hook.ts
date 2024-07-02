import {
  Tag,
  Test,
  isAlreadyExistsError,
  isError,
  projectAddTestTag,
  projectDeleteTestTag,
  projectGetOrCreateTagByName,
} from "testmatic";

import { showNotification } from "../../notification";
import { useProject } from "../../project";

interface UseTestEditorTagsProps {
  readonly test: Test;
}

export function useTestEditorTags(props: UseTestEditorTagsProps) {
  const { project, saveProject } = useProject();

  const handleAddItem = (newItem: string) => {
    if (!project) {
      return;
    }

    const { test } = props;

    const tag = projectGetOrCreateTagByName(project?.tagsByName ?? {})(newItem);

    const updatedProject = projectAddTestTag({
      project,
      tag,
      test,
    });

    if (isAlreadyExistsError(updatedProject)) {
      showNotification({
        type: "error",
        message: updatedProject.message,
      });
      return;
    }

    saveProject(updatedProject);
  };

  const handleItemDeleteClick = (tag: Tag) => () => {
    if (!project) {
      return;
    }

    const { test } = props;

    const projectDeleteTestTagResult = projectDeleteTestTag({
      project,
      test,
      tag,
    });

    if (isError(projectDeleteTestTagResult)) {
      showNotification({
        type: "error",
        message: projectDeleteTestTagResult.message,
      });
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
