import { Link } from "react-router-dom";

import { AppWorkspace } from "../app";
import { Box } from "../box";
import { Heading } from "../heading";
import { IconNames } from "../icon";
import { IconButton } from "../icon-button";
import { Header, Stack } from "../layout";
import { testEditorRoute } from "../test-editor";
import { Text } from "../text";
import { ExpandingTextBox } from "../text-box";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";

import * as Styled from "./tag-editor.styles";
import { useTagEditor } from "./use-tag-editor.hook";

export const TagEditorIds = {
  TitleContainer: "tag-editor-title-container",
};

export function TagEditor() {
  const {
    tag,
    tagReferencedTests,

    handleCloseClick,
    handleChangeTitle,
    handleChangeDescription,
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

                <Box flex={1} id={TagEditorIds.TitleContainer} key={tag.title}>
                  <TitleEditor
                    defaultValue={tag.title}
                    outdent
                    hoverBorder
                    onBlur={handleChangeTitle}
                  />
                </Box>
              </Stack>
            </Heading>
          }
          actionsSlot={
            <Stack direction="row" spacing={1}>
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
            <ExpandingTextBox
              defaultValue={tag.description}
              placeholder="Description (optional)"
              outdent
              hoverBorder
              onBlur={handleChangeDescription}
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
