import { formatDateTimeString } from "testmatic";

import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { TextOverflow } from "../../text-overflow";
import { TitleEditor } from "../../title-editor";

import { useRunEditor } from "./use-run-editor.hook";

export function RunEditorHeading() {
  const { test, run, runDateTime, handleChangeRunDateTime } = useRunEditor();

  if (!run || !test || !runDateTime) {
    return null;
  }

  return (
    <Heading level={2}>
      <Stack direction="row" spacing={1} alignItems="stretch">
        <Stack direction="row" alignItems="center">
          Run:
        </Stack>

        <Stack direction="row" alignItems="center" minWidth={170} width={170}>
          <TitleEditor
            defaultValue={formatDateTimeString(runDateTime)}
            hoverBorder
            onChange={handleChangeRunDateTime}
          />
        </Stack>

        <Stack direction="row" alignItems="center" overflow="hidden">
          <TextOverflow>Test: {test?.title}</TextOverflow>
        </Stack>
      </Stack>
    </Heading>
  );
}
