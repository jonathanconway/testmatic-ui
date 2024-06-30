import { useGetProject } from "../project";
import { TEST_NEW_NAME } from "./test-editor.routes";
import deepEqual from "deep-equal";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "testmatic";

interface TestEditorTestState {
  readonly test?: Test;
}

export function useEditingTest() {
  const [state, setState] = useState<TestEditorTestState>({});

  const { data: project } = useGetProject();

  const { testName = undefined } = useParams();

  const isNewTest = testName === TEST_NEW_NAME;

  const originalTest = testName ? project?.testsByName[testName] : undefined;

  const editingTest = state?.test || originalTest;

  const test = editingTest ?? originalTest;

  const isDirty = state?.test;

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
    [originalTest, setState]
  );

  return {
    editingTest,
    test,
    isNewTest,
    testName,
    isDirty,
    setEditingTest,
  };
}