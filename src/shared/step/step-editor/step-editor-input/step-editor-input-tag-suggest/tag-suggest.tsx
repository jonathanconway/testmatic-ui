import { MouseEvent, useEffect } from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../../../hooks";

import { filterTags } from "./tag-suggest-filter-tags";
import * as Styled from "./tag-suggest.styles";

interface TagSuggestProps {
  readonly selectedTag?: Tag;
  readonly filterText?: string;

  readonly onSelectTag: (tag: Tag) => void;
  readonly onClose: VoidFunction;
}

export function TagSuggest(props: TagSuggestProps) {
  const { project } = useProject();

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

  const isFiltering = !!props.filterText;

  const filteredTags = isFiltering
    ? filterTags(project?.tags, props.filterText)
    : project?.tags;

  const highlightedTag = isFiltering
    ? filteredTags?.[0] ?? props.selectedTag
    : props.selectedTag ?? project?.tags?.[0];

  return (
    <Styled.PopupContainer onClick={handleClick}>
      {filteredTags?.map((tag, index) => (
        <Styled.Item
          key={`${tag.name}_${index}`}
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
