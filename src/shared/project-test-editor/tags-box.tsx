import { AddRemoveListBox } from "../add-remove-list-box";
import { ListBoxItem } from "../list-box";
import { useTagsBox } from "./use-tags-box.hook";
import { Link } from "react-router-dom";
import { Test } from "testmatic";

export interface TagsBoxProps {
  readonly test: Test;
}

export function TagsBox(props: TagsBoxProps) {
  const { handleAddItem, handleItemDeleteClick } = useTagsBox(props);

  const tags = props.test.tags;

  return (
    <AddRemoveListBox
      items={tags.map((tag) => tag.title)}
      onAddItem={handleAddItem}
    >
      {tags.map((tag) => (
        <ListBoxItem
          key={tag.name}
          value={tag.name}
          onDeleteClick={handleItemDeleteClick(tag)}
        >
          🏷️&nbsp;
          <Link to={`/tag_${tag.name}`}>{tag.title}</Link>
        </ListBoxItem>
      ))}
    </AddRemoveListBox>
  );
}
