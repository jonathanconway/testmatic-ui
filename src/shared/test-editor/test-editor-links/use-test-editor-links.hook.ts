import { useGetProject } from "../../project/use-get-project.hook";
import { usePostProject } from "../../project/use-post-project.hook";
import { Link, Test, projectDeleteTestLink } from "testmatic";

interface UseTestLinksProps {
  readonly test: Test;
}

export function useTestLinks(props: UseTestLinksProps) {
  const { data: project } = useGetProject();

  const { mutate: postProject } = usePostProject();

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

    postProject(updatedProject);
  }
  return {
    handleDeleteClick,
  };
}
