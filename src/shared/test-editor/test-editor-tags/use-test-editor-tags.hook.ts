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
import { useGetProject } from "../../project/use-get-project.hook";
import { usePostProject } from "../../project/use-post-project.hook";

interface UseTestEditorTagsProps {
  readonly test: Test;
}

export function useTestEditorTags(props: UseTestEditorTagsProps) {
  const { data: project } = useGetProject();
  const { mutate: postProject } = usePostProject();

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

    postProject(updatedProject);
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

    postProject(updatedProject);
  };

  return {
    handleAddItem,
    handleItemDeleteClick,
  };
}
