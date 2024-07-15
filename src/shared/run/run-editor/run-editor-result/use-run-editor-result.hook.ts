import { isError } from "lodash";
import { SyntheticEvent } from "react";
// import React, { MouseEvent } from "react";
import { RunResult } from "testmatic";

import { getStorageFns } from "../../../../hooks";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../notification";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorResult() {
  const { runDateTime, test, run } = useEditingRun();

  const runResult = run?.result;

  const { updateTestRunResult } = getStorageFns();

  const handleRunResultClick =
    (updatedRunResult?: RunResult) =>
    async (event: SyntheticEvent<HTMLElement>) => {
      if (!test || !runDateTime || !updatedRunResult) {
        return;
      }

      const updateTestRunResultResult = updateTestRunResult(
        test?.name,
        runDateTime,
        updatedRunResult,
      );

      if (isError(updateTestRunResultResult)) {
        showErrorNotification(updateTestRunResultResult);
        return;
      }

      showSuccessNotification(undefined, {
        anchorElement: event.currentTarget,
      });
    };

  return {
    runResult,
    handleRunResultClick,
  };
}
