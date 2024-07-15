import { useNavigate, useParams } from "react-router-dom";

import { useProject } from "../../hooks";
import { tagEditorNewTagRoute } from "../tag-editor";

export function useProjectExplorer() {
  const { project } = useProject();

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

  const shouldRenderExpand = Boolean(
    project.tests.find((test) => test.runs.length > 0),
  );

  const onClickTestAdd = () => {
    // navigate(testEditorNewTestRoute());
  };

  const onClickTagAdd = () => {
    navigate(tagEditorNewTagRoute());
  };

  return {
    project,
    selected,
    shouldRenderExpand,
    selectedItemId,
    onClickTestAdd,
    onClickTagAdd,
  };
}
