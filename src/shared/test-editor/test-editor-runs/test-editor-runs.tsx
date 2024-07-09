import { Link } from "react-router-dom";
import { Test } from "testmatic";

import { AddRemoveListBox } from "../../add-remove-list-box";
import { Box } from "../../box";
import { Heading } from "../../heading";
import { Icon } from "../../icon";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { RunResultIcon, runEditorRoute } from "../../run";
import { formatDateTimeString } from "../../utils";

import { useTestEditorRuns } from "./use-test-editor-runs.hook";

export interface TestEditorRunsProps {
  readonly test: Test;
}

export function TestEditorRuns(props: TestEditorRunsProps) {
  const { runs, handleAddItem, handleDeleteItem } = useTestEditorRuns();

  return (
    <AddRemoveListBox
      headerContent={<Heading level={3}>Runs</Heading>}
      onAddItem={handleAddItem}
    >
      {runs.map((run) => (
        <ListBoxItem
          key={run.dateTime}
          value={run.dateTime}
          onDeleteClick={handleDeleteItem(run)}
        >
          <Stack direction="row" gap={0.5} alignItems="center" mr={1}>
            <Icon icon="run" />
            <Box flex={1}>
              <Link
                to={runEditorRoute({
                  testName: props.test.name,
                  runDateTime: run.dateTime,
                })}
              >
                {formatDateTimeString(run.dateTime)}
              </Link>
            </Box>

            <RunResultIcon runResult={run.result} />
          </Stack>
        </ListBoxItem>
      ))}
    </AddRemoveListBox>
  );
}
