import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Test } from "testmatic";

import { RunEditorRouteParams } from "../run";

import { useProjectExplorer } from "./use-project-explorer.hook";

interface UseProjectExplorerTestItemProps {
  readonly test: Test;
}

interface UseProjectExplorerTestItem {
  readonly isExpanded: boolean;
}

export function useProjectExplorerTestItem(
  props: UseProjectExplorerTestItemProps,
) {
  const { selected, shouldRenderExpand } = useProjectExplorer();

  const { testName, runDateTime } = useParams<RunEditorRouteParams>();

  const isSelected =
    props.test.name === selected.testName && !selected.runDateTime;

  const [state, setState] = useState<UseProjectExplorerTestItem>({
    isExpanded: false,
  });

  // Auto-expand when test run is opened
  useEffect(() => {
    if (props.test.name === testName && runDateTime && !state.isExpanded) {
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

  return {
    isExpanded,
    isSelected,
    shouldRenderExpand,
    toggleExpanded,
  };
}
