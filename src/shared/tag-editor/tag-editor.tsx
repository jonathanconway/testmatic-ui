import { Link } from "react-router-dom";

import { BorderBox } from "../border-box";
import { Box } from "../box";
import { Button } from "../button";
import { Heading } from "../heading";
import { IconButton } from "../icon-button";
import { InlineExpandingTextBox } from "../inline-expanding-text-box";
import { Header, Stack } from "../layout";
import { testEditorRoute } from "../test-editor";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";

import * as Styled from "./tag-editor.styles";
import { useTagEditor } from "./use-tag-editor.hook";

export function TagEditor() {
  const {
    tag,
    tagReferencedTests,
    isNewTag,
    isSaveButtonDisabled,
    handleCloseClick,
    handleChangeTitle,
    handleChangeDescription,
    handleClickSave,
  } = useTagEditor();

  if (!tag) {
    return null;
  }

  return (
    <BorderBox flex={1}>
      <Stack spacing={2} height="100%">
        <Header
          headingSlot={
            <Heading level={2}>
              <Stack direction="row" spacing={1} alignContent="center">
                <span>Tag:</span>

                <Box flex={1}>
                  <TitleEditor
                    value={tag.title}
                    autoFocus={isNewTag}
                    autoSelect={isNewTag}
                    onChange={handleChangeTitle}
                  />
                </Box>
              </Stack>
            </Heading>
          }
          actionsSlot={
            <Stack direction="row" spacing={1}>
              <Button disabled={isSaveButtonDisabled} onClick={handleClickSave}>
                Save
              </Button>

              <Tooltip contents="Close">
                <IconButton
                  icon="close"
                  size="normal"
                  onClick={handleCloseClick}
                />
              </Tooltip>
            </Stack>
          }
        ></Header>

        <Stack spacing={2} height="100%">
          <InlineExpandingTextBox
            value={tag.description}
            onChange={handleChangeDescription}
            placeholder="Description (optional)"
          />

          {tagReferencedTests.length > 0 && (
            <Stack spacing={1}>
              <Heading level={3}>Tests</Heading>
              <Styled.TestsList>
                {tagReferencedTests.map((test) => (
                  <Styled.TestsListItem key={test.name}>
                    <div>
                      🧪&nbsp;
                      <Link to={testEditorRoute(test.name)}>{test.title}</Link>
                    </div>
                  </Styled.TestsListItem>
                ))}
              </Styled.TestsList>
            </Stack>
          )}
        </Stack>
      </Stack>
    </BorderBox>
  );
}
