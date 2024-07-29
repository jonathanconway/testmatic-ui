import { MouseEvent, useEffect } from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../../hooks";
import { filterTags } from "../../../step/step-editor/step-editor-input/step-editor-input-tag-suggest/tag-suggest-filter-tags";
import { useEditingTest } from "../../use-editing-test.hook";

import * as Styled from "./test-editor-tags-tag-input-suggest.styles";

interface TestEditorTagsTagInputSuggestProps {
  readonly selectedTag?: Tag;
  readonly filterText?: string;

  readonly onSelectTag: (tag: Tag) => void;
  readonly onClose: VoidFunction;
}

export function TestEditorTagsTagInputSuggest(
  props: TestEditorTagsTagInputSuggestProps,
) {
  const { project } = useProject();

  const { test } = useEditingTest();

  const testTags = test?.tags?.map((tag) => tag.name) ?? [];

  const tagsAvailableForAdding = (project?.tags ?? []).filter(
    (tag) => !testTags.includes(tag.name),
  );

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
    ? filterTags(tagsAvailableForAdding, props.filterText)
    : tagsAvailableForAdding;

  const highlightedTag = isFiltering
    ? filteredTags?.[0] ?? props.selectedTag
    : props.selectedTag ?? tagsAvailableForAdding?.[0];

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
