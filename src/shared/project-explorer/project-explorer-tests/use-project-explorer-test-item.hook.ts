import { isError } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Test,
  projectGetTestRunLatest,
  testCreateNameFromTitle,
} from "testmatic";

import { getDuplicateTestTitle, useProject } from "../../../hooks";
import { homeRoute } from "../../../screens";
import {
  showErrorNotification,
  showSuccessOrErrorNotification,
} from "../../notification";
import { RunEditorRouteParams } from "../../run";
import { testEditorRoute } from "../../test-editor";
import { getValueOrUndefinedIfError } from "../../utils";
import { useProjectExplorer } from "../use-project-explorer.hook";

import { ProjectExplorerTestsIds } from "./project-explorer-tests";

interface UseProjectExplorerTestItemParams {
  readonly test: Test;
}

interface UseProjectExplorerTestItem {
  readonly isExpanded: boolean;
}

export function useProjectExplorerTestItem(
  params: UseProjectExplorerTestItemParams,
) {
  const { selected, shouldRenderExpand } = useProjectExplorer();

  const { runs } = params.test;

  const { project, deleteTest, addNewTest } = useProject();

  const testActionsRef = useRef(null);

  const navigate = useNavigate();

  const { testName, runDateTime } = useParams<RunEditorRouteParams>();

  const isSelected =
    params.test.name === selected.testName && !selected.runDateTime;

  const [state, setState] = useState<UseProjectExplorerTestItem>({
    isExpanded: false,
  });

  // Auto-expand when test run is opened
  useEffect(() => {
    if (params.test.name === testName && runDateTime && !state.isExpanded) {
      setState({
        isExpanded: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testName, runDateTime]);

  const toggleExpanded = () => {
    setState((previousState) => ({
      ...previousState,
      isExpanded: !previousState.isExpanded,
    }));
  };

  const isExpanded = state.isExpanded;

  const testRunLatest = getValueOrUndefinedIfError(
    projectGetTestRunLatest({
      project,
      lookupTestNameOrTitle: params.test.name,
    }),
  );

  const handleTestDeleteClick = (lookupTestName: string) => async () => {
    const deleteTestResult = await deleteTest(lookupTestName);

    showSuccessOrErrorNotification(deleteTestResult, {
      message: "Deleted",
      anchorElement: window.document.querySelector<HTMLElement>(
        `#${ProjectExplorerTestsIds.Section}`,
      ),
    });

    if (isError(deleteTestResult)) {
      return;
    }

    navigate(homeRoute());
  };

  const handleTestDuplicateClick = (lookupTestName: string) => async () => {
    const sourceTest = project.testsByName[lookupTestName];

    const title = getDuplicateTestTitle(project, sourceTest.title);

    const newTest = {
      ...sourceTest,
      title,
      name: testCreateNameFromTitle(title),
    };

    if (isError(newTest)) {
      showErrorNotification(newTest, {
        anchorElement: testActionsRef.current,
      });
      return;
    }

    const addNewTestResult = await addNewTest(newTest);

    showSuccessOrErrorNotification(addNewTestResult, {
      message: "Duplicated",
      anchorElement: testActionsRef.current,
    });

    if (isError(addNewTestResult)) {
      return;
    }

    navigate(testEditorRoute(newTest.name));
  };

  return {
    isExpanded,
    isSelected,
    shouldRenderExpand,
    runs,
    testRunLatest,
    testActionsRef,
    toggleExpanded,
    handleTestDeleteClick,
    handleTestDuplicateClick,
  };
}
