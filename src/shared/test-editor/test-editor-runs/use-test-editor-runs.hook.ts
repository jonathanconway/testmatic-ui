import { isError } from "lodash";
import { Run, createRunNow } from "testmatic";

import { useStorage } from "../../../hooks";
import {
  showErrorNotification,
  showSuccessOrErrorNotification,
} from "../../notification";
import { getElementById } from "../../utils";
import { useEditingTest } from "../use-editing-test.hook";

import { TestEditorRunsIds } from "./test-editor-runs.const";

export function useTestEditorRuns() {
  const { addNewTestRun, deleteTestRun } = useStorage();

  const { test, runs } = useEditingTest();

  const testName = test?.name ?? "";

  async function handleAddItem() {
    if (!test) {
      return;
    }

    const createRunNowResult = createRunNow({
      test,
    });

    if (isError(createRunNowResult)) {
      showErrorNotification(createRunNowResult);
      return;
    }

    const newRun = createRunNowResult;

    const result = await addNewTestRun(test.name, newRun);

    showSuccessOrErrorNotification(result, {
      anchorElement: getElementById(TestEditorRunsIds.Container),
    });
  }

  function handleDeleteItem(runToDelete: Run) {
    return async function () {
      if (!test) {
        return;
      }

      const result = await deleteTestRun(test.name, runToDelete.dateTime);

      showSuccessOrErrorNotification(result, {
        anchorElement: getElementById(TestEditorRunsIds.Container),
      });
    };
  }

  return {
    testName,
    runs,

    handleAddItem,
    handleDeleteItem,
  };
}
