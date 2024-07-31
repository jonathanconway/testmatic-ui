import { SyntheticEvent } from "react";
import { RunResult } from "testmatic";

import { useStorage } from "../../../../hooks";
import { showSuccessOrErrorNotification } from "../../../notification";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorResult() {
  const { runDateTime, test, run } = useEditingRun();

  const runResult = run?.result;

  const { updateTestRunResult } = useStorage();

  const handleRunResultClick =
    (updatedRunResult?: RunResult) =>
    async (event: SyntheticEvent<HTMLElement>) => {
      if (!test || !runDateTime || !updatedRunResult) {
        return;
      }

      if (runResult === updatedRunResult) {
        return;
      }

      const anchorElement = event.currentTarget;

      const result = await updateTestRunResult(
        test?.name,
        runDateTime,
        updatedRunResult,
      );

      showSuccessOrErrorNotification(result, {
        anchorElement,
      });
    };

  return {
    runResult,

    handleRunResultClick,
  };
}
