import { AppWorkspace } from "../app";
import { Box } from "../box";
import { IconNames } from "../icon";
import { IconButton } from "../icon-button";
import { Header, Stack } from "../layout";
import { Tooltip } from "../tooltip";

import { TestEditorDescription } from "./test-editor-description";
import { TestEditorLinks } from "./test-editor-links";
import { TestEditorRuns } from "./test-editor-runs";
import { TestEditorSteps } from "./test-editor-steps";
import { TestEditorTags } from "./test-editor-tags";
import { TestEditorTitle } from "./test-editor-title";
import { useTestEditor } from "./use-test-editor.hook";

export function TestEditor() {
  const { test, handleCloseClick } = useTestEditor();

  return (
    <AppWorkspace key={test?.name}>
      <Stack spacing={2} flex={1}>
        <Header
          headingSlot={<TestEditorTitle />}
          actionsSlot={
            <Tooltip contents="Close">
              <IconButton icon={IconNames.Close} onClick={handleCloseClick} />
            </Tooltip>
          }
        />

        <TestEditorDescription />

        <Stack direction="row" spacing={4} flex={1}>
          <Box width="60%">
            <TestEditorSteps />
          </Box>

          <Stack
            direction="column"
            spacing={4}
            justifyContent="space-evenly"
            width="40%"
          >
            <TestEditorTags />

            <TestEditorLinks />

            <TestEditorRuns />
          </Stack>
        </Stack>
      </Stack>
    </AppWorkspace>
  );
}
