import { isError } from "lodash";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTest, testCreateNameFromTitle } from "testmatic";

import { useProject } from "../../../hooks";
import { getDuplicateItemTitle } from "../../item";
import { showErrorNotification } from "../../notification";
import { TEST_NEW, testEditorRoute } from "../../test-editor";
import { TestEditorTitleIds } from "../../test-editor";
import { timeout } from "../../utils";

export function useProjectExplorerTests() {
  const { project, addNewTest } = useProject();

  const navigate = useNavigate();

  const { itemId: selectedItemId } = useParams();

  // todo - extract to projectview creation?
  const testTitles = useMemo(
    () => project.tests.map((test) => test.title),
    [project.tests],
  );

  const handleTestAddClick = async () => {
    const title = getDuplicateItemTitle(testTitles, TEST_NEW.title);

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

    await timeout();

    const titleEditor = window.document.getElementById(
      TestEditorTitleIds.TitleEditor,
    ) as HTMLTextAreaElement;
    titleEditor?.focus();
    titleEditor.selectionStart = 0;
    titleEditor.selectionEnd = titleEditor.value.length;
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
