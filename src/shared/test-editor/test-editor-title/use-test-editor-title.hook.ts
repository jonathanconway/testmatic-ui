import { isError } from "lodash";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { testCreateNameFromTitle } from "testmatic";

import { getStorageFns } from "../../../hooks";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification";
import { timeout } from "../../utils";
import { Ids } from "../test-editor.const";
import { testEditorRoute } from "../test-editor.routes";
import { useEditingTest } from "../use-editing-test.hook";

interface UseTestEditorTitleResult {
  readonly title?: string;
  readonly isNewTest: boolean;
  readonly handleChangeTitle: (
    event: SyntheticEvent<HTMLTextAreaElement>,
  ) => Promise<void>;
}

export function useTestEditorTitle(): UseTestEditorTitleResult {
  const { test, isNewTest } = useEditingTest();

  const storageFns = getStorageFns();

  const navigateTo = useNavigate();

  const title = test?.title;

  const handleChangeTitle = async (
    event: SyntheticEvent<HTMLTextAreaElement>,
  ) => {
    if (!test) {
      return;
    }

    const title = event.currentTarget.value;

    if (title === test.title) {
      return;
    }

    const updateTestTitleResult = await storageFns.updateTestTitle(
      test.name,
      title,
    );

    if (isError(updateTestTitleResult)) {
      showErrorNotification(updateTestTitleResult);
    }

    await timeout();

    navigateTo(testEditorRoute(testCreateNameFromTitle(title)));

    await timeout();

    showSuccessNotification(undefined, {
      anchorElement: document.body.querySelector<HTMLElement>(
        `#${Ids.TitleEditor}`,
      ),
    });
  };

  return {
    handleChangeTitle,
    title,
    isNewTest,
  };
}
