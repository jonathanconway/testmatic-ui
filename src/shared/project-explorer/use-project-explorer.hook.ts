import { isError } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Test, projectDeleteTag, projectDeleteTest } from "testmatic";

import { homeRoute } from "../../screens";
import { showErrorNotification } from "../notification";
import { useProject } from "../project/use-project.hook";
import { tagEditorNewTagRoute } from "../tag-editor";
import { testEditorNewTestRoute } from "../test-editor";

export function useProjectExplorer() {
  const { project, saveProject } = useProject();

  const navigate = useNavigate();

  const {
    testName,
    tagName,
    runDateTime,
    itemId: selectedItemId,
  } = useParams();

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
      lookupTagNameOrTitle: tagToDelete.name,
    });

    if (isError(updatedProject)) {
      showErrorNotification(updatedProject);
      return;
    }

    saveProject(updatedProject);

    navigate(homeRoute());
  };

  const shouldRenderExpand = Boolean(
    project.tests.find((test) => test.runs.length > 0),
  );

  const onClickTestAdd = () => {
    navigate(testEditorNewTestRoute());
  };

  const onClickTagAdd = () => {
    navigate(tagEditorNewTagRoute());
  };

  return {
    project,
    selected,
    shouldRenderExpand,
    selectedItemId,
    handleCancelNewTestClick,
    handleDeleteTestClick,
    handleDeleteTagClick,
    onClickTestAdd,
    onClickTagAdd,
  };
}
