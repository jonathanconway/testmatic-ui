import { Link } from "react-router-dom";
import { Test } from "testmatic";

import { AddRemoveListBox } from "../../add-remove-list-box";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { tagEditorRoute } from "../../tag-editor";

import { useTestEditorTags } from "./use-test-editor-tags.hook";

export interface TestEditorTagsProps {
  readonly test: Test;
}

export function TestEditorTags(props: TestEditorTagsProps) {
  const { handleAddItem, handleItemDeleteClick } = useTestEditorTags(props);

  const tags = props.test.tags;

  return (
    <Stack spacing={1}>
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
