import { useEffect, useState } from "react";
import { useProjectExplorer } from "./use-project-explorer.hook";
import { Test } from "testmatic";
import { useParams } from "react-router-dom";
import { RunEditorRouteParams } from "../run";

interface UseProjectExplorerTestItemProps {
  readonly test: Test;
}

interface UseProjectExplorerTestItem {
  readonly isExpanded: boolean;
}

export function useProjectExplorerTestItem(
  props: UseProjectExplorerTestItemProps
) {
  const { selected } = useProjectExplorer();

  const { testName, runDateTime } = useParams<RunEditorRouteParams>();

  const isSelected =
    props.test.name === selected.testName && !selected.runDateTime;

  const [state, setState] = useState<UseProjectExplorerTestItem>({
    isExpanded: false,
  });

  useEffect(() => {
    if (props.test.name === testName && runDateTime && !state.isExpanded) {
      setState({
        isExpanded: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExpanded = () => {
    setState((previousState) => ({
      ...previousState,
      isExpanded: !previousState.isExpanded,
    }));
  };

  // const isTestRunSelected =
  //   props.test.name === selected.testName && Boolean(selected.runDateTime);

  const isExpanded = state.isExpanded; // || isTestRunSelected;

  return {
    isExpanded,
    isSelected,
    toggleExpanded,
  };
}
