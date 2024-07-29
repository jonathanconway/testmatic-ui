import { Text } from "../../text";
import { ExpandingTextBox } from "../../text-box";

import { TestEditorDescriptionIds } from "./test-editor-description.const";
import { useTestEditorDescription } from "./use-test-editor-description.hook";

export function TestEditorDescription() {
  const { description, handleDescriptionBlur } = useTestEditorDescription();

  // todo: extract to DescriptionEditor (?)
  return (
    <Text key={description}>
      <ExpandingTextBox
        id={TestEditorDescriptionIds.DescriptionEditor}
        defaultValue={description}
        placeholder="Description (optional)"
        outdent
        hoverBorder
        onBlur={handleDescriptionBlur}
      />
    </Text>
  );
}
