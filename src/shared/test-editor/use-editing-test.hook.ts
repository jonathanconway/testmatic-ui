import deepEqual from "deep-equal";
import { orderBy } from "lodash";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "testmatic";

import { useTest } from "../../hooks";

import { TEST_NEW_NAME, TestEditorRouteParams } from "./test-editor.routes";

interface TestEditorTestState {
  readonly test?: Test;
}

export function useEditingTest() {
  const [state, setState] = useState<TestEditorTestState>({});

  const { testName = undefined } = useParams<TestEditorRouteParams>();

  const { test: originalTest } = useTest(testName);

  const isNewTest = testName === TEST_NEW_NAME;

  const editingTest = state?.test;

  const test = editingTest ?? originalTest;

  const runs = orderBy(test?.runs, "dateTime", "desc");

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

    setEditingTest,
  };
}
