import { useNavigate, useParams } from "react-router-dom";

import { useProject } from "../../project";
import { testEditorNewTestRoute } from "../../test-editor";

export function useProjectExplorerTests() {
  const { project } = useProject();

  const navigate = useNavigate();

  const { itemId: selectedItemId } = useParams();

  const handleTestAddClick = () => {
    navigate(testEditorNewTestRoute());
  };

  const handleTestAddCancelClick = () => {
    navigate("/");
  };

  return {
    project,
    selectedItemId,
    handleTestAddClick,
    handleTestAddCancelClick,
  };
}
