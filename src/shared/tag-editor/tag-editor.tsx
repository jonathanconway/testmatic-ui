import { Link } from "react-router-dom";

import { AppWorkspace } from "../app";
import { Box } from "../box";
import { Button } from "../button";
import { Heading } from "../heading";
import { IconNames } from "../icon";
import { IconButton } from "../icon-button";
import { Header, Stack } from "../layout";
import { testEditorRoute } from "../test-editor";
import { Text } from "../text";
import { InlineExpandingTextBox } from "../text-box";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";

import * as Styled from "./tag-editor.styles";
import { useTagEditor } from "./use-tag-editor.hook";

export function TagEditor() {
  const {
    tag,
    tagReferencedTests,
    isNewTag,
    isCreateButtonDisabled,
    handleCloseClick,
    handleChangeTitle,
    handleChangeDescription,
    handleClickSave,
  } = useTagEditor();

  if (!tag) {
    return null;
  }

  return (
    <AppWorkspace>
      <Stack spacing={2} flex={1}>
        <Header
          headingSlot={
            <Heading level={2}>
              <Stack direction="row" spacing={1} alignItems="center">
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
              {isNewTag && (
                <Button
                  disabled={isCreateButtonDisabled}
                  onClick={handleClickSave}
                >
                  Create
                </Button>
              )}

              <Tooltip contents="Close">
                <IconButton
                  icon={IconNames.Close}
                  size="normal"
                  onClick={handleCloseClick}
                />
              </Tooltip>
            </Stack>
          }
        ></Header>

        <Stack spacing={2} height="100%">
          <Text>
            <InlineExpandingTextBox
              value={tag.description}
              onChange={handleChangeDescription}
              placeholder="Description (optional)"
            />
          </Text>

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
    </AppWorkspace>
  );
}
