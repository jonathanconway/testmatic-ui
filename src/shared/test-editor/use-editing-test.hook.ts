import deepEqual from "deep-equal";
import { orderBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "testmatic";

import { useProject } from "../project";

import { TEST_NEW, TEST_NEW_NAME } from "./test-editor.routes";

interface TestEditorTestState {
  readonly test?: Test;
}

export function useEditingTest() {
  const [state, setState] = useState<TestEditorTestState>({});

  const { project } = useProject();

  const { testName = undefined } = useParams();

  const isNewTest = testName === TEST_NEW_NAME;

  const originalTest = testName ? project?.testsByName[testName] : undefined;

  const editingTest = state?.test;

  const test = editingTest ?? originalTest;

  const isDirty = state?.test;

  const runs = orderBy(test?.runs, "dateTime", "desc");

  useEffect(() => {
    if (testName === TEST_NEW_NAME && !state.test) {
      setState({
        test: TEST_NEW,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testName]);

  const setEditingTest = useCallback(
    (newEditingTest?: Test) => {
      if (
        newEditingTest &&
        originalTest &&
        deepEqual(newEditingTest, originalTest)
      ) {
        setState((previousState) => ({ ...previousState, test: undefined }));
      } else {
        setState((previousState) => ({
          ...previousState,
          test: newEditingTest,
        }));
      }
    },
    [originalTest, setState],
  );

  return {
    editingTest,
    test,
    runs,
    isNewTest,
    testName,
    isDirty,
    setEditingTest,
  };
}
