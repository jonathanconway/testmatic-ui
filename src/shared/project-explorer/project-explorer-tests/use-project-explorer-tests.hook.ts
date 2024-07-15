import { isError } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { createTest, testCreateNameFromTitle } from "testmatic";

import { getDuplicateTestTitle, useProject } from "../../../hooks";
import { showErrorNotification } from "../../notification";
import { TEST_NEW, testEditorRoute } from "../../test-editor";

export function useProjectExplorerTests() {
  const { project, addNewTest } = useProject();

  const navigate = useNavigate();

  const { itemId: selectedItemId } = useParams();

  const handleTestAddClick = async () => {
    const title = getDuplicateTestTitle(project, TEST_NEW.title);

    const newTest = createTest({
      ...TEST_NEW,
      title,
      name: testCreateNameFromTitle(title),
      stepTexts: [],
    });

    if (isError(newTest)) {
      showErrorNotification(newTest);
      return;
    }

    await addNewTest(newTest);

    navigate(testEditorRoute(newTest.name));
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
