import { AddRemoveListBox } from "../../add-remove-list-box";
import { Button } from "../../button";
import { Heading } from "../../heading";
import { Icon, IconNames } from "../../icon";
import { Item } from "../../item";
import { Stack } from "../../layout";
import { Link } from "../../link";
import { ListBox, ListBoxItem } from "../../list-box";
import { tagEditorRoute } from "../../tag-editor";
import { TextBox } from "../../text-box";

import { TestEditorTagsTagInput } from "./test-editor-tags-tag-input";
import { useTestEditorTags } from "./use-test-editor-tags.hook";

export function TestEditorTags() {
  const {
    tagsContainerRef,
    tags,
    addInputValue,
    isAddButtonEnabled,
    handleAddInputInput,
    handleAddInputSelectItem,
    handleAddButtonClick,
    handleItemDeleteClick,
  } = useTestEditorTags();

  return (
    <Stack ref={tagsContainerRef} spacing={1} flex={1}>
      <Heading level={3}>Tags</Heading>

      <Stack spacing={0.5} overflow="scroll" height="100%">
        <Stack spacing={0.5} direction="row" justifyContent="space-evenly">
          <TestEditorTagsTagInput
            value={addInputValue}
            onInput={handleAddInputInput}
            onSelectItem={handleAddInputSelectItem}
          />

          <Button
            size="small"
            disabled={!isAddButtonEnabled}
            onClick={handleAddButtonClick}
          >
            Add
          </Button>
        </Stack>

        <ListBox>
          {tags.map((tag) => (
            <ListBoxItem
              key={tag.name}
              value={tag.name}
              onDeleteClick={handleItemDeleteClick(tag)}
            >
              <Item
                icon={IconNames.Tag}
                title={tag.title}
                linkHref={tagEditorRoute(tag.name)}
              />
            </ListBoxItem>
          ))}
        </ListBox>
      </Stack>
    </Stack>
  );
}
