import { BorderBox } from "../border-box";
import { Box } from "../box";
import { Button } from "../button";
import { Heading } from "../heading";
import { Header, Stack } from "../layout";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";
import { RunsBox } from "./runs-box";
import { TestLinks } from "./test-editor-links";
import { TestEditorSteps } from "./test-editor-steps";
import { TestEditorTags } from "./test-editor-tags";
import {
  OtherContainer,
  Column,
  RunsContainer,
  H3,
} from "./test-editor.styles";
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
    <BorderBox flex={1}>
      <Stack spacing={1} height="100%">
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

        <TestEditorSteps test={test} onChange={handleChangeTest} />

        <OtherContainer>
          <Column>
            <TestEditorTags test={test} />

            <TestLinks test={test} />
          </Column>
          <Column>
            <RunsContainer>
              <H3>Runs</H3>
              <RunsBox test={test} />
            </RunsContainer>
          </Column>
        </OtherContainer>
      </Stack>
    </BorderBox>
  );
}
