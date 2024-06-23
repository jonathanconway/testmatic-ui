import { useGetProject } from "../../../../project";
import { filterTags } from "./tag-suggest-filter-tags";
import * as Styled from "./tag-suggest.styles";
import { MouseEvent, useEffect } from "react";
import { Tag } from "testmatic";

interface TagSuggestProps {
  readonly selectedTag?: Tag;
  readonly filterText?: string;

  readonly onSelectTag: (tag: Tag) => void;
  readonly onClose: VoidFunction;
}

export function TagSuggest(props: TagSuggestProps) {
  const { data: project } = useGetProject();

  useEffect(() => {
    window.addEventListener("click", () => {
      props.onClose();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const isFiltering = !!props.filterText; //!props.selectedTag;

  const filteredTags = isFiltering
    ? filterTags(project?.tags, props.filterText)
    : project?.tags;

  const highlightedTag = isFiltering
    ? filteredTags?.[0] ?? props.selectedTag
    : props.selectedTag ?? project?.tags?.[0];

  // console.log("TagSuggest", props.filterText, { isFiltering, filteredTags });

  return (
    <Styled.PopupContainer onClick={handleClick}>
      {filteredTags?.map((tag) => (
        <Styled.Item
          key={tag.name}
          $highlighted={tag.name === highlightedTag?.name}
          onClick={() => props.onSelectTag(tag)}
        >
          🏷️&nbsp;
          {tag.title}
        </Styled.Item>
      ))}
    </Styled.PopupContainer>
  );
}
