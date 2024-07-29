import { Test } from "testmatic";

import { Box } from "../../box";
import { Icon, IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Stack } from "../../layout";
import { Link } from "../../link";
import { MenuItem } from "../../menu";
import { PopupMenu } from "../../popup-menu";
import { testEditorRoute } from "../../test-editor";
import { TextOverflow } from "../../text-overflow";
import { Tooltip } from "../../tooltip";
import { sentenceCase } from "../../utils";
import * as Styled from "../project-explorer.styles";

import { ProjectExplorerTestRunItem } from "./project-explorer-test-run-item";
import { useProjectExplorerTestItem } from "./use-project-explorer-test-item.hook";

interface ProjectExplorerTestItemProps {
  readonly test: Test;
}

export function ProjectExplorerTestItem(props: ProjectExplorerTestItemProps) {
  const {
    isExpanded,
    isSelected,
    shouldRenderExpand,
    runs,
    testRunLatest,
    testActionsRef,
    toggleExpanded,
    handleTestDeleteClick,
    handleTestDuplicateClick,
  } = useProjectExplorerTestItem(props);

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

          <Icon icon={IconNames.Test} size="small" />

          <Box flex={1} overflow="hidden">
            <TextOverflow>
              <Link to={testEditorRoute(props.test.name)} style={{ flex: 1 }}>
                <Tooltip contents={props.test.title}>
                  {props.test.title}
                </Tooltip>
              </Link>
            </TextOverflow>
          </Box>

          <Tooltip contents={sentenceCase(testRunLatest?.result ?? "not run")}>
            <Icon
              icon={testRunLatest?.result ?? IconNames.NotRun}
              cursor="default"
            />
          </Tooltip>

          <PopupMenu
            anchor={
              <Tooltip contents="Test actions">
                <IconButton
                  size="small"
                  icon={IconNames.ThreeDots}
                  ref={testActionsRef}
                />
              </Tooltip>
            }
          >
            <MenuItem
              key="duplicate"
              title="Duplicate"
              onClick={handleTestDuplicateClick(props.test.name)}
            />
          </PopupMenu>

          <Tooltip contents="Delete test">
            <IconButton
              size="small"
              icon={IconNames.Delete}
              onClick={handleTestDeleteClick(props.test.name)}
            />
          </Tooltip>
        </Stack>
      </Styled.ProjectExplorerItem>

      {isExpanded &&
        runs.map((run) => (
          <ProjectExplorerTestRunItem
            key={`${props.test.name}-${run.dateTime}`}
            test={props.test}
            run={run}
          />
        ))}
    </>
  );
}
