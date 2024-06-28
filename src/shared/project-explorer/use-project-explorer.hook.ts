import { homeRoute } from "../../screens";
import { useGetProject } from "../project/use-get-project.hook";
import { usePostProject } from "../project/use-post-project.hook";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Test, projectDeleteTag, projectDeleteTest } from "testmatic";

export function useProjectExplorer() {
  const { data: project } = useGetProject();
  const { mutate: postProject } = usePostProject();

  const navigate = useNavigate();

  const { testName, tagName, runDateTime } = useParams();

  const selected = {
    testName,
    tagName,
    runDateTime,
  };

  const handleCancelNewTestClick = () => {
    navigate("/");
  };

  const handleDeleteTestClick = (testToDelete: Test) => () => {
    if (!project) {
      return;
    }

    const updatedProject = projectDeleteTest({
      project,
      testToDelete,
    });

    postProject(updatedProject);

    navigate(homeRoute());
  };

  const handleDeleteTagClick = (tagToDelete: Tag) => () => {
    if (!project) {
      return;
    }

    const updatedProject = projectDeleteTag({
      project,
      tagToDelete,
    });

    postProject(updatedProject);

    navigate(homeRoute());
  };

  return {
    selected,
    handleCancelNewTestClick,
    handleDeleteTestClick,
    handleDeleteTagClick,
  };
}
