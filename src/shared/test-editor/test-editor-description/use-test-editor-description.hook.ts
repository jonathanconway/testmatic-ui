import { ChangeEvent } from "react";

import { useStorage } from "../../../hooks";
import { showSuccessOrErrorNotification } from "../../notification";
import { timeout } from "../../utils";
import { useEditingTest } from "../use-editing-test.hook";

import { TestEditorDescriptionIds } from "./test-editor-description.const";

export function useTestEditorDescription() {
  const { test } = useEditingTest();

  const { updateTestDescription } = useStorage();

  const description = test?.description;

  const handleDescriptionBlur = async (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    // const description = event.target.innerText;
    // console.log("handleChangeDescription", { description }, test.description);
    const description = event.target.value;

    if (description === test.description) {
      return;
    }

    const updateTestDescriptionResult = updateTestDescription(
      test.name,
      description,
    );

    await timeout(100);

    showSuccessOrErrorNotification(updateTestDescriptionResult, {
      anchorElement: window.document.getElementById(
        TestEditorDescriptionIds.DescriptionEditor,
      ),
    });
  };

  return {
    description,

    handleDescriptionBlur,
  };
}
