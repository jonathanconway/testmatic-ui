import { isError } from "lodash";
import {
  Run,
  createRunNow,
  projectAddTestRun,
  projectDeleteRun,
} from "testmatic";

import { showErrorNotification } from "../../notification";
import { useProject } from "../../project";
import { useEditingTest } from "../use-editing-test.hook";

export function useTestEditorRuns() {
  const { project, saveProject } = useProject();

  const { test, runs } = useEditingTest();

  function handleAddItem() {
    if (!test) {
      return;
    }

    const createRunNowResult = createRunNow();

    if (isError(createRunNowResult)) {
      showErrorNotification(createRunNowResult);
      return;
    }

    const newRun = createRunNowResult;

    const projectAddTestRunResult = projectAddTestRun({
      project,
      lookupTestNameOrTitle: test.name,
      newRun,
    });

    if (isError(projectAddTestRunResult)) {
      showErrorNotification(projectAddTestRunResult);
      return;
    }

    saveProject(projectAddTestRunResult);
  }

  function handleDeleteItem(runToDelete: Run) {
    return function () {
      if (!test) {
        return;
      }

      const updatedProject = projectDeleteRun({
        project,
        lookupTestNameOrTitle: test.name,
        runToDelete,
      });

      if (isError(updatedProject)) {
        showErrorNotification(updatedProject);
        return;
      }

      saveProject(updatedProject);
    };
  }

  return {
    runs,
    handleAddItem,
    handleDeleteItem,
  };
}
