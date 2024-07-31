import { Run, Test } from "testmatic";

import { useStorage, useTest } from "../../../hooks";
import { showSuccessOrErrorNotification } from "../../notification";
import { getElementById } from "../../utils";

import { ProjectExplorerTestsIds } from "./project-explorer-tests";

export interface UseProjectExplorerTestRunItemProps {
  readonly test: Test;
}

export function useProjectExplorerTestRunItem(
  props: UseProjectExplorerTestRunItemProps,
) {
  const { deleteTestRun } = useStorage();

  const handleDeleteRunClick = (runToDelete: Run) => async () => {
    if (!props.test) {
      return;
    }

    const result = await deleteTestRun(props.test.name, runToDelete.dateTime);

    showSuccessOrErrorNotification(result, {
      anchorElement: getElementById(ProjectExplorerTestsIds.Section),
    });
  };

  return {
    handleDeleteRunClick,
  };
}
