import { FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { testCreateNameFromTitle } from "testmatic";

import { useStorage } from "../../../hooks";
import { showSuccessOrErrorNotification } from "../../notification";
import { getElementById, timeout } from "../../utils";
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

    const result = await updateTestTitle(title, newTitle);

    await timeout();

    navigateTo(testEditorRoute(testCreateNameFromTitle(newTitle)));

    await timeout(100);

    showSuccessOrErrorNotification(result, {
      anchorElement: getElementById(TestEditorTitleIds.TitleEditor),
    });
  };

  return {
    title,

    handleTitleChange,
  };
}
