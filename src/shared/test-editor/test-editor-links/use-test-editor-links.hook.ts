import { Link, projectDeleteTestLink } from "testmatic";

import { useProject } from "../../../hooks";
import { useEditingTest } from "../use-editing-test.hook";

export function useTestLinks() {
  const { project, saveProject } = useProject();

  const { test } = useEditingTest();

  const links = test?.links ?? [];

  function handleDeleteClick(linkToDelete: Link) {
    if (!project || !test) {
      return;
    }

    const updatedProject = projectDeleteTestLink({
      project,
      test,
      linkToDelete,
    });

    saveProject(updatedProject);
  }
  return {
    links,

    handleDeleteClick,
  };
}
