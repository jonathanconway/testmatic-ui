import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Test, projectDeleteTest, projectGetTestRunLatest } from "testmatic";

import { homeRoute } from "../../../screens";
import { useProject } from "../../project";
import { RunEditorRouteParams } from "../../run";
import { getValueOrUndefinedIfError } from "../../utils";
import { useProjectExplorer } from "../use-project-explorer.hook";

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

  const { project, saveProject } = useProject();

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

  const handleTestDeleteClick = (testToDelete: Test) => () => {
    if (!project) {
      return;
    }

    const updatedProject = projectDeleteTest({
      project,
      testToDelete,
    });

    saveProject(updatedProject);

    navigate(homeRoute());
  };

  return {
    isExpanded,
    isSelected,
    shouldRenderExpand,
    runs,
    testRunLatest,
    toggleExpanded,
    handleTestDeleteClick,
  };
}
