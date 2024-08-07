import { Link } from "react-router-dom";
import { Run, Test, formatDateTimeString } from "testmatic";

import { Box } from "../../box";
import { Icon, IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { runEditorRoute } from "../../run";
import { TextOverflow } from "../../text-overflow";
import { Tooltip } from "../../tooltip";
import { sentenceCase } from "../../utils";
import * as Styled from "../project-explorer.styles";
import { useProjectExplorer } from "../use-project-explorer.hook";

import { useProjectExplorerTestRunItem } from "./use-project-explorer-test-run-item.hook";

interface ProjectExplorerTestRunItemProps {
  readonly test: Test;
  readonly run: Run;
}

export function ProjectExplorerTestRunItem(
  props: ProjectExplorerTestRunItemProps,
) {
  const { selected } = useProjectExplorer();

  const { handleDeleteRunClick } = useProjectExplorerTestRunItem(props);

  return (
    <Styled.ProjectExplorerItemNested
      $selected={
        selected.testName === props.test.name &&
        selected.runDateTime === props.run.dateTime
      }
    >
      <Stack
        direction="row"
        alignItems="center"
        flex={1}
        gap={0.5}
        ml={1}
        width="100%"
      >
        <Icon icon={IconNames.Run} size="small" cursor="default" />

        <Box flex={1} overflow="hidden">
          <TextOverflow>
            <Link
              to={runEditorRoute({
                testName: props.test.name,
                runDateTime: props.run.dateTime,
              })}
            >
              <Tooltip contents={props.test.title}>
                {formatDateTimeString(props.run.dateTime)}
              </Tooltip>
            </Link>
          </TextOverflow>
        </Box>

        <Tooltip contents={sentenceCase(props.run?.result ?? "not-run")}>
          <Icon icon={props.run?.result ?? IconNames.NotRun} cursor="default" />
        </Tooltip>

        <Tooltip contents="Delete run">
          <IconButton
            size="small"
            icon={IconNames.Delete}
            onClick={handleDeleteRunClick(props.run)}
          />
        </Tooltip>
      </Stack>
    </Styled.ProjectExplorerItemNested>
  );
}
