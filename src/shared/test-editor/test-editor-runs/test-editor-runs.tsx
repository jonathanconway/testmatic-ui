import { AddRemoveListBox } from "../../add-remove-list-box";
import { Box } from "../../box";
import { Heading } from "../../heading";
import { IconNames } from "../../icon";
import { Item } from "../../item";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { RunResultIcon, runEditorRoute } from "../../run";
import { formatDateTimeString } from "../../utils";

import { useTestEditorRuns } from "./use-test-editor-runs.hook";

export function TestEditorRuns() {
  const { testName, runs, handleAddItem, handleDeleteItem } =
    useTestEditorRuns();

  return (
    <Box flex={1}>
      <AddRemoveListBox
        renderHeaderContent={() => <Heading level={3}>Runs</Heading>}
        onAddItem={handleAddItem}
      >
        {runs.map((run) => (
          <ListBoxItem
            key={run.dateTime}
            value={run.dateTime}
            onDeleteClick={handleDeleteItem(run)}
          >
            <Stack direction="row" gap={0.5} alignItems="center" mr={1}>
              <Item
                icon={IconNames.Run}
                title={formatDateTimeString(run.dateTime)}
                linkHref={runEditorRoute({
                  testName,
                  runDateTime: run.dateTime,
                })}
              />

              <RunResultIcon runResult={run.result} />
            </Stack>
          </ListBoxItem>
        ))}
      </AddRemoveListBox>
    </Box>
  );
}
