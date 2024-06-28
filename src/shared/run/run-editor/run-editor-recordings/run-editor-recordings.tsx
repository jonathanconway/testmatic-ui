import { Box } from "../../../box";
import { Heading } from "../../../heading";
import { Stack } from "../../../layout";

interface RunEditorRecordingsProps {}

export function RunEditorRecordings(props: RunEditorRecordingsProps) {
  return (
    <Stack spacing={1}>
      <Heading level={3}>Recordings</Heading>

      <Box width={250}>
        <Stack direction="column" alignItems="center" spacing={1}></Stack>
      </Box>
    </Stack>
  );
}
