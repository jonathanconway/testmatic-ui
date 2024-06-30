import { RunResult } from "testmatic";

import { testRunUpdateResult } from "../../../client";
import { showNotification } from "../../../notification";
import { NotificationTypes } from "../../../notification/notification-type";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorResult() {
  const { runDateTime, editingRun, test, refetchProject } = useEditingRun();

  const runResult = editingRun?.result;

  const handleRunResultClick = (updatedRunResult?: RunResult) => async () => {
    if (!test || !runDateTime) {
      return;
    }

    await testRunUpdateResult(test?.name, runDateTime, updatedRunResult);

    refetchProject();

    showNotification({
      type: NotificationTypes.Success,
      message: "Saved",
    });
  };

  return {
    runResult,
    handleRunResultClick,
  };
}
