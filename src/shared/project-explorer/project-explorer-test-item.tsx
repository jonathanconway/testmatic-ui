import { Test, projectGetTestRunLatest } from "testmatic";

import { Box } from "../box";
import { Icon, IconNames } from "../icon";
import { IconButton } from "../icon-button";
import { Stack } from "../layout";
import { Link } from "../link";
import { testEditorRoute } from "../test-editor";
import { TextOverflow } from "../text-overflow";
import { Tooltip } from "../tooltip";
import { sentenceCase } from "../utils";

import { ProjectExplorerTestRunItem } from "./project-explorer-test-run-item";
import * as Styled from "./project-explorer.styles";
import { useProjectExplorerTestItem } from "./use-project-explorer-test-item.hook";
import { useProjectExplorer } from "./use-project-explorer.hook";

interface ProjectExplorerTestItemProps {
  readonly test: Test;
}

export function ProjectExplorerTestItem(props: ProjectExplorerTestItemProps) {
  const { handleDeleteTestClick } = useProjectExplorer();

  const { isExpanded, isSelected, toggleExpanded, shouldRenderExpand } =
    useProjectExplorerTestItem(props);

  const testRunLatest = projectGetTestRunLatest(props.test);

  return (
    <>
      <Styled.ProjectExplorerItem key={props.test.name} $selected={isSelected}>
        <Stack
          direction="row"
          alignItems="center"
          flex={1}
          gap={0.5}
          width="100%"
        >
          {shouldRenderExpand && (
            <>
              {testRunLatest ? (
                <IconButton
                  icon={isExpanded ? "collapse" : "expand"}
                  size="small"
                  onClick={toggleExpanded}
                />
              ) : (
                <Box width="1rem"></Box>
              )}
            </>
          )}

          <Icon icon="test" size="small" />

          <Box flex={1} overflow="hidden">
            <TextOverflow>
              <Link to={testEditorRoute(props.test.name)} style={{ flex: 1 }}>
                <Tooltip contents={props.test.title}>
                  {props.test.title}
                </Tooltip>
              </Link>
            </TextOverflow>
          </Box>

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
        </Stack>
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
