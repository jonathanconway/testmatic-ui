import { HTMLProps } from "react";

import { AutoSuggestTextBox } from "../../../auto-suggest-text-box";
import { IconNames } from "../../../icon";
import { Item } from "../../../item";

import { useTestEditorTagsInput } from "./use-test-editor-tags-input.hook";

interface TestEditorTagsInputProps extends HTMLProps<HTMLInputElement> {
  readonly onSelectItem: (suggestion: string) => void;
}

export function TestEditorTagsInput(props: TestEditorTagsInputProps) {
  const { onSelectItem, ...restProps } = props;

  const { items } = useTestEditorTagsInput();

  return (
    <AutoSuggestTextBox
      {...restProps}
      items={items}
      onSelectItem={props.onSelectItem}
      renderSuggestion={(item) => <Item icon={IconNames.Tag} title={item} />}
    />
  );
}
