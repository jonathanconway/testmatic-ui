import { Link, Test, projectDeleteTestLink } from "testmatic";

import { useProject } from "../../project";

interface UseTestLinksProps {
  readonly test: Test;
}

export function useTestLinks(props: UseTestLinksProps) {
  const { project, saveProject } = useProject();

  function handleDeleteClick(linkToDelete: Link) {
    if (!project) {
      return;
    }

    const { test } = props;

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
