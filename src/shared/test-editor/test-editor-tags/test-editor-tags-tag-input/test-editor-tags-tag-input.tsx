import { HTMLProps } from "react";

import { useProject } from "../../../../hooks";
import { AutoSuggestTextBox } from "../../../auto-suggest-text-box";
import { Icon, IconNames } from "../../../icon";
import { Stack } from "../../../layout";
import { Text } from "../../../text";
import { useEditingTest } from "../../use-editing-test.hook";

interface TestEditorTagsTagInputProps extends HTMLProps<HTMLInputElement> {
  readonly onSelectItem: (suggestion: string) => void;
}

export function TestEditorTagsTagInput(props: TestEditorTagsTagInputProps) {
  const { project } = useProject();

  const { test } = useEditingTest();

  const testTags = (test?.tags ?? []).map((tag) => tag.name);

  const tagsAvailableForAdding = (project?.tags ?? []).filter(
    (tag) => !testTags.includes(tag.name),
  );

  const items = tagsAvailableForAdding.map((tag) => tag.title);

  const { onSelectItem, ...restProps } = props;

  return (
    <AutoSuggestTextBox
      {...restProps}
      items={items}
      onSelectItem={props.onSelectItem}
      renderSuggestion={(item) => (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Icon icon={IconNames.Tag} />
          <Text>{item}</Text>
        </Stack>
      )}
    />
  );
}
