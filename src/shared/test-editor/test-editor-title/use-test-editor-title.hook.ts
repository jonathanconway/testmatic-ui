import { isError } from "lodash";
import { FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { testCreateNameFromTitle } from "testmatic";

import { useStorage } from "../../../hooks";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification";
import { timeout } from "../../utils";
import { testEditorRoute } from "../test-editor.routes";
import { useEditingTest } from "../use-editing-test.hook";

import { TestEditorTitleIds } from "./test-editor-title.const";

export function useTestEditorTitle() {
  const { test } = useEditingTest();

  const { updateTestTitle } = useStorage();

  const navigateTo = useNavigate();

  const title = test?.title;

  const handleTitleChange = async (event: FocusEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;

    if (title === newTitle) {
      return;
    }

    const updateTestTitleResult = await updateTestTitle(title, newTitle);

    if (isError(updateTestTitleResult)) {
      showErrorNotification(updateTestTitleResult);
    }

    await timeout();

    navigateTo(testEditorRoute(testCreateNameFromTitle(newTitle)));

    await timeout();

    showSuccessNotification(undefined, {
      anchorElement: document.getElementById(TestEditorTitleIds.TitleEditor),
    });
  };

  return {
    title,

    handleTitleChange,
  };
}
