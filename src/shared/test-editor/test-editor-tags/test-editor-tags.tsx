import { Link } from "react-router-dom";

import { AddRemoveListBox } from "../../add-remove-list-box";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { tagEditorRoute } from "../../tag-editor";

import { useTestEditorTags } from "./use-test-editor-tags.hook";

export function TestEditorTags() {
  const { tags, handleAddItem, handleItemDeleteClick } = useTestEditorTags();

  return (
    <Stack spacing={1} flex={1}>
      <Heading level={3}>Tags</Heading>

      <AddRemoveListBox onAddItem={handleAddItem}>
        {tags.map((tag) => (
          <ListBoxItem
            key={tag.name}
            value={tag.name}
            onDeleteClick={handleItemDeleteClick(tag)}
          >
            🏷️&nbsp;
            <Link to={tagEditorRoute(tag.name)}>{tag.title}</Link>
          </ListBoxItem>
        ))}
      </AddRemoveListBox>
    </Stack>
  );
}
