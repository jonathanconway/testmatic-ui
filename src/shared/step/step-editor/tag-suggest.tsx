import { useGetProject } from "../../project";
import { Container, Item } from "./tag-suggest.styles";
import { MouseEvent, useEffect } from "react";
import { Tag } from "testmatic";

interface TagSuggestProps {
  readonly selectedTag?: Tag;

  readonly onSelectTag: (tag: Tag) => void;
  readonly onClose: VoidFunction;
}

export function TagSuggest({
  selectedTag,
  onSelectTag,
  onClose,
}: TagSuggestProps) {
  const { data: project } = useGetProject();

  useEffect(() => {
    window.addEventListener("click", () => {
      onClose();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Container onClick={handleClick}>
      {project?.tags.map((tag) => (
        <Item
          key={tag.name}
          selected={tag.name === selectedTag?.name}
          onClick={() => onSelectTag(tag)}
        >
          🏷️&nbsp;
          {tag.title}
        </Item>
      ))}
    </Container>
  );
}
