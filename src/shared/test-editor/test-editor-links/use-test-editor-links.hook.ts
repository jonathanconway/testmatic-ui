import { Link, Test, projectDeleteTestLink } from "testmatic";

import { useProject } from "../../project";

interface UseTestLinksParams {
  readonly test: Test;
}

export function useTestLinks(params: UseTestLinksParams) {
  const { project, saveProject } = useProject();

  function handleDeleteClick(linkToDelete: Link) {
    if (!project) {
      return;
    }

    const { test } = params;

    const updatedProject = projectDeleteTestLink({
      project,
      test,
      linkToDelete,
    });

    saveProject(updatedProject);
  }
  return {
    handleDeleteClick,
  };
}
