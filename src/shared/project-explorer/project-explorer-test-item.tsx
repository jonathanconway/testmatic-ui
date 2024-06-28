import { Test, projectGetTestRunLatest } from "testmatic";
import * as Styled from "./project-explorer.styles";

import { IconButton } from "../icon-button";
import { Tooltip } from "../tooltip";
import { Link } from "react-router-dom";
import { testEditorRoute } from "../test-editor";
import { useProjectExplorer } from "./use-project-explorer.hook";
import { sentenceCase } from "../utils";
import { Icon, IconNames } from "../icon";
import { useProjectExplorerTestItem } from "./use-project-explorer-test-item.hook";
import { ProjectExplorerTestRunItem } from "./project-explorer-test-run-item";

interface ProjectExplorerTestItemProps {
  readonly test: Test;
}

export function ProjectExplorerTestItem(props: ProjectExplorerTestItemProps) {
  const { handleDeleteTestClick } = useProjectExplorer();

  const { isExpanded, isSelected, toggleExpanded } =
    useProjectExplorerTestItem(props);

  const testRunLatest = projectGetTestRunLatest(props.test);

  return (
    <>
      <Styled.ProjectExplorerItem key={props.test.name} $selected={isSelected}>
        <Styled.ProjectExplorerItemMain>
          <Styled.ProjectExplorerItemIcon>
            {testRunLatest ? (
              <IconButton
                icon={isExpanded ? "collapse" : "expand"}
                size="small"
                onClick={toggleExpanded}
              />
            ) : (
              <Icon icon="test" size="small" />
            )}
          </Styled.ProjectExplorerItemIcon>

          <Tooltip contents={props.test.title}>
            <Link to={testEditorRoute(props.test.name)}>
              {props.test.title}
            </Link>
          </Tooltip>
        </Styled.ProjectExplorerItemMain>

        <Styled.ProjectExplorerItemActions>
          <Tooltip contents={sentenceCase(testRunLatest?.result ?? "not-run")}>
            <Icon icon={testRunLatest?.result ?? IconNames.NotRun} />
          </Tooltip>

          <Tooltip contents="Delete test">
            <IconButton
              size="small"
              icon="delete"
              onClick={handleDeleteTestClick(props.test)}
            />
          </Tooltip>
        </Styled.ProjectExplorerItemActions>
      </Styled.ProjectExplorerItem>

      {isExpanded &&
        props.test.runs.map((run) => (
          <ProjectExplorerTestRunItem
            key={`${props.test.name}-${run.dateTime}`}
            test={props.test}
            run={run}
          />
        ))}
    </>
  );
}
