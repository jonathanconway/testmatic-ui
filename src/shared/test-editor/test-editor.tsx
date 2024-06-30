import { BorderBox } from "../border-box";
import { Box } from "../box";
import { Button } from "../button";
import { Heading } from "../heading";
import { Header, Stack } from "../layout";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";
import { TestEditorLinks } from "./test-editor-links";
import { TestEditorRuns } from "./test-editor-runs";
import { TestEditorSteps } from "./test-editor-steps";
import { TestEditorTags } from "./test-editor-tags";
import { useTestEditor } from "./use-test-editor.hook";

export function TestEditor() {
  const {
    test,
    isSaveButtonDisabled,
    isNewTest,
    handleClickSave,
    handleChangeTitle,
    handleChangeTest,
    handleCloseClick,
  } = useTestEditor();
  if (!test) {
    return null;
  }
  console.log(test.runs);

  return (
    <BorderBox flex={1} overflow="scroll">
      <Stack spacing={2} height="100%">
        <Header
          headingSlot={
            <Heading level={2}>
              <Stack direction="row" spacing={1} alignContent="center">
                <span>Test:</span>
                <Box flex={1}>
                  <TitleEditor
                    value={test.title}
                    autoFocus={isNewTest}
                    autoSelect={isNewTest}
                    onChange={handleChangeTitle}
                  />
                </Box>
              </Stack>
            </Heading>
          }
          actionsSlot={
            <Stack direction="row" spacing={1}>
              <Button disabled={isSaveButtonDisabled} onClick={handleClickSave}>
                {isNewTest ? "Create" : "Save"}
              </Button>

              <Tooltip contents="Close">
                <Button onClick={handleCloseClick}>✕</Button>
              </Tooltip>
            </Stack>
          }
        />

        <Stack direction="row" spacing={4}>
          <Box width="60%">
            <TestEditorSteps test={test} onChange={handleChangeTest} />
          </Box>

          <Stack direction="column" spacing={4} width="40%">
            <TestEditorTags test={test} />

            <TestEditorLinks test={test} />

            <TestEditorRuns test={test} />
          </Stack>
        </Stack>
      </Stack>
    </BorderBox>
  );
}
