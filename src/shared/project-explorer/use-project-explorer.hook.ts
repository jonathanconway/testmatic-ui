import { useNavigate, useParams } from "react-router-dom";
import { Tag, Test, projectDeleteTag, projectDeleteTest } from "testmatic";

import { homeRoute } from "../../screens";
import { useProject } from "../project/use-project.hook";

export function useProjectExplorer() {
  const { project, saveProject } = useProject();

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

    saveProject(updatedProject);

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

    saveProject(updatedProject);

    navigate(homeRoute());
  };

  const shouldRenderExpand = Boolean(
    project.tests.find((test) => test.runs.length > 0),
  );

  return {
    selected,
    shouldRenderExpand,
    handleCancelNewTestClick,
    handleDeleteTestClick,
    handleDeleteTagClick,
  };
}
