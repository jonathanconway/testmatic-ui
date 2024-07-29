import { Box } from "../../box";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { TitleEditor } from "../../title-editor";

import { TestEditorTitleIds } from "./test-editor-title.const";
import { useTestEditorTitle } from "./use-test-editor-title.hook";

export function TestEditorTitle() {
  const { title, handleTitleChange } = useTestEditorTitle();

  return (
    <Heading level={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <span>Test:</span>
        <Box flex={1} key={title}>
          <TitleEditor
            id={TestEditorTitleIds.TitleEditor}
            defaultValue={title}
            hoverBorder
            onBlur={handleTitleChange}
          />
        </Box>
      </Stack>
    </Heading>
  );
}
