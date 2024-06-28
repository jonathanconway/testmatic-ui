import { BorderBox } from "../../border-box";
import { Button } from "../../button";
import { Heading } from "../../heading";
import { Header, Stack } from "../../layout";
import { TitleEditor } from "../../title-editor";
import { Tooltip } from "../../tooltip";
import { useRunEditor } from "./use-run-editor.hook";
import { formatDateTimeString } from "testmatic";
import { RunEditorSteps } from "./run-editor-steps";
import { TextOverflow } from "../../text-overflow";
import { RunEditorResult } from "./run-editor-result";
import { RunEditorFolder } from "./run-editor-folder";
import { RunEditorRecordings } from "./run-editor-recordings/run-editor-recordings";

export function RunEditor() {
  const { test, run, runDateTime, handleChangeRunDateTime, handleCloseClick } =
    useRunEditor();

  if (!run || !test || !runDateTime) {
    return null;
  }

  return (
    <BorderBox flex={1} overflow="scroll">
      <Stack spacing={2} height="100%">
        <Header
          headingSlot={
            <Heading level={2}>
              <Stack direction="row" spacing={1} alignItems="stretch">
                <Stack direction="row" alignItems="center">
                  Run:
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  minWidth={170}
                  width={170}
                >
                  <TitleEditor
                    value={formatDateTimeString(runDateTime)}
                    onChange={handleChangeRunDateTime}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" overflow="hidden">
                  <TextOverflow>Test: {test?.title}</TextOverflow>
                </Stack>
              </Stack>
            </Heading>
          }
          actionsSlot={
            <Stack direction="row" spacing={1}>
              <Tooltip contents="Close">
                <Button onClick={handleCloseClick}>✕</Button>
              </Tooltip>
            </Stack>
          }
        />

        <Stack direction="row" spacing={4}>
          <RunEditorSteps test={test} />

          <Stack direction="column" spacing={2}>
            <RunEditorResult runResult={run?.result} />

            <RunEditorFolder test={test} run={run} />

            <RunEditorRecordings />
          </Stack>
        </Stack>
      </Stack>
    </BorderBox>
  );
}
