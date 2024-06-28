import { Run, Test, formatDateTimeString } from "testmatic";
import * as Styled from "./project-explorer.styles";
import { useProjectExplorer } from "./use-project-explorer.hook";
import { Icon, IconNames } from "../icon";
import { runEditorRoute } from "../run";
import { Link } from "react-router-dom";
import { Tooltip } from "../tooltip";
import { sentenceCase } from "../utils";
import { IconButton } from "../icon-button";
import { useProjectExplorerTestRunItem } from "./use-project-explorer-test-run-item.hook";

interface ProjectExplorerTestRunItemProps {
  readonly test: Test;
  readonly run: Run;
}

export function ProjectExplorerTestRunItem(
  props: ProjectExplorerTestRunItemProps
) {
  const { selected } = useProjectExplorer();

  const { handleDeleteRunClick } = useProjectExplorerTestRunItem();

  return (
    <Styled.ProjectExplorerItemNested
      $selected={
        selected.testName === props.test.name &&
        selected.runDateTime === props.run.dateTime
      }
    >
      <Styled.ProjectExplorerItemMain>
        <Styled.ProjectExplorerItemIcon>
          <Icon icon="run" size="small" />
        </Styled.ProjectExplorerItemIcon>

        <Link
          to={runEditorRoute({
            testName: props.test.name,
            runDateTime: props.run.dateTime,
          })}
        >
          {formatDateTimeString(props.run.dateTime)}
        </Link>
      </Styled.ProjectExplorerItemMain>
      <Styled.ProjectExplorerItemActions>
        <Tooltip contents={sentenceCase(props.run?.result ?? "not-run")}>
          <Icon icon={props.run?.result ?? IconNames.NotRun} />
        </Tooltip>

        <Tooltip contents="Delete run">
          <IconButton
            size="small"
            icon="delete"
            onClick={handleDeleteRunClick(props.run)}
          />
        </Tooltip>
      </Styled.ProjectExplorerItemActions>
    </Styled.ProjectExplorerItemNested>
  );
}
