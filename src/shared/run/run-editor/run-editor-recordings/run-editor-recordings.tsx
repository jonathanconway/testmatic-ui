import { Box } from "../../../box";
import { Heading } from "../../../heading";
import { Stack } from "../../../layout";

import * as Styled from "./run-editor-recordings.styles";
import { useRunEditorRecordings } from "./use-run-editor-recordings.hook";

export function RunEditorRecordings() {
  const { runRecordings } = useRunEditorRecordings();

  return (
    <Stack spacing={1}>
      <Heading level={3}>Recordings</Heading>

      <Box width={250} overflow="scroll">
        <Stack direction="column" alignItems="center" spacing={1}>
          {runRecordings?.map((runRecording) => (
            <Styled.Img
              key={runRecording.thumbnailUrl}
              src={runRecording.thumbnailUrl}
              alt={runRecording.thumbnailFilename}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
