import { showNotification } from "../notification";
import { useGetProject } from "../project/use-get-project.hook";
import { usePostProject } from "../project/use-post-project.hook";
import {
  Tag,
  Test,
  isAlreadyExistsError,
  projectAddTestTag,
  projectDeleteTestTag,
  projectGetOrCreateTagByName,
} from "testmatic";

interface UseTagsBoxProps {
  readonly test: Test;
}

export function useTagsBox(props: UseTagsBoxProps) {
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

    const updatedProject = projectDeleteTestTag({
      project,
      test,
      tag,
    });

    postProject(updatedProject);
  };

  return {
    handleAddItem,
    handleItemDeleteClick,
  };
}
