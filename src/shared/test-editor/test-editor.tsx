import { Box } from "../box";
import { Button } from "../button";
import { Heading } from "../heading";
import { Header, Stack } from "../layout";
import { Text } from "../text";
import { InlineExpandingTextBox } from "../text-box/inline-expanding-text-box";
import { Tooltip } from "../tooltip";

import { TestEditorLinks } from "./test-editor-links";
import { TestEditorRuns } from "./test-editor-runs";
import { TestEditorSteps } from "./test-editor-steps";
import { TestEditorTags } from "./test-editor-tags";
import { TestEditorTitle } from "./test-editor-title";
import { useTestEditor } from "./use-test-editor.hook";

export function TestEditor() {
  const {
    test,
    isCreateButtonDisabled,
    isNewTest,
    handleClickCreate,
    handleChangeDescription,
    handleCloseClick,
  } = useTestEditor();

  if (!test) {
    return null;
  }

  return (
    <Box flex={1} overflow="scroll" padding="0.5rem">
      <Stack spacing={2} height="100%">
        <Header
          headingSlot={
            <Heading level={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <span>Test:</span>
                <Box flex={1}>
                  <TestEditorTitle />
                </Box>
              </Stack>
            </Heading>
          }
          actionsSlot={
            <Stack direction="row" spacing={1}>
              {isNewTest && (
                <Button
                  disabled={isCreateButtonDisabled}
                  onClick={handleClickCreate}
                >
                  Create
                </Button>
              )}

              <Tooltip contents="Close">
                <Button onClick={handleCloseClick}>✕</Button>
              </Tooltip>
            </Stack>
          }
        />

        <Text>
          <InlineExpandingTextBox
            value={test.description}
            onChange={handleChangeDescription}
            placeholder="Description (optional)"
          />
        </Text>

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
    </Box>
  );
}
