import deepEqual from "deep-equal";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Run } from "testmatic";

import { useProject } from "../../project";

interface RunEditorRunState {
  readonly run?: Run;
}

export function useEditingRun() {
  const [state, setState] = useState<RunEditorRunState>({});

  const { project, refetch: refetchProject } = useProject();

  const { testName = undefined, runDateTime = undefined } = useParams();

  const test = testName ? project?.testsByName[testName] : undefined;

  //  todo: add runsByDateTime to projectview test in core
  const originalRun =
    testName && runDateTime
      ? test?.runs.find((run) => run.dateTime === runDateTime)
      : undefined;

  const editingRun = state?.run || originalRun;

  const run = editingRun ?? originalRun;

  const isDirty = state?.run;

  const setEditingRun = useCallback(
    (newEditingRun?: Run) => {
      if (
        newEditingRun &&
        originalRun &&
        deepEqual(newEditingRun, originalRun)
      ) {
        setState((previousState) => ({ ...previousState, run: undefined }));
      } else {
        setState((previousState) => ({
          ...previousState,
          run: newEditingRun,
        }));
      }
    },
    [originalRun, setState],
  );

  return {
    editingRun,
    run,
    test,
    runDateTime,
    isDirty,
    setEditingRun,
    refetchProject,
  };
}
