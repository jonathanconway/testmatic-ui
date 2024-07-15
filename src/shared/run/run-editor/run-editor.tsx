import { Box } from "../../box";
import { Button } from "../../button";
import { Header, Stack } from "../../layout";
import { Tooltip } from "../../tooltip";

import { RunEditorFolder } from "./run-editor-folder";
import { RunEditorHeading } from "./run-editor-heading";
import { RunEditorRecordings } from "./run-editor-recordings";
import { RunEditorResult } from "./run-editor-result";
import { RunEditorSteps } from "./run-editor-steps";
import { useRunEditor } from "./use-run-editor.hook";

export function RunEditor() {
  const { test, run, runDateTime, handleCloseClick } = useRunEditor();

  if (!run || !test || !runDateTime) {
    return null;
  }

  return (
    <Box flex={1} overflow="scroll" padding="0.5rem">
      <Stack spacing={2} height="100%">
        <Header
          headingSlot={<RunEditorHeading />}
          actionsSlot={
            <Stack direction="row" spacing={1}>
              <Tooltip contents="Close">
                <Button onClick={handleCloseClick}>✕</Button>
              </Tooltip>
            </Stack>
          }
        />

        <Stack direction="row" spacing={4}>
          <Box width="60%">
            <RunEditorSteps />
          </Box>

          <Stack direction="column" spacing={4} width="40%">
            <RunEditorResult />

            <RunEditorFolder />

            <RunEditorRecordings />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
