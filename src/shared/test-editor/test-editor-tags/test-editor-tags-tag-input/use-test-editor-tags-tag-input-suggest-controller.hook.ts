import { difference } from "lodash";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  HTMLProps,
  KeyboardEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../../hooks";
import { getIsElementOutsideContainer } from "../../../popover/is-element-outside-container";
import { filterTags } from "../../../step/step-editor/step-editor-input/step-editor-input-tag-suggest/tag-suggest-filter-tags";
import {
  InputTagSelectionInfo,
  getInputTagSelectionInfo,
} from "../../../step/step-editor/step-editor-input/step-editor-input-tag-suggest/tag-suggest-selection-info";
import { Maybe, timeout } from "../../../utils";
import { useEditingTest } from "../../use-editing-test.hook";

interface UseTestEditorTagsTagInputSuggestControllerParams
  extends HTMLProps<HTMLInputElement> {
  readonly onSuggestionSelect: (suggestion: string) => void;
}

export function useTestEditorTagsTagInputSuggestController(
  params: UseTestEditorTagsTagInputSuggestControllerParams,
) {
  const [inputTagSelectionInfo, setInputTagSelectionInfo] =
    useState<Maybe<InputTagSelectionInfo>>();

  const [tagSuggestHighlightedTag, setTagSuggestHighlightedTag] =
    useState<Maybe<Tag>>();

  const [tagSuggestIsOpen, setTagSuggestIsOpen] = useState(false);

  const tagSuggestContainerRef = useRef<HTMLDivElement>(null);

  const { project } = useProject();
  console.log({ project });

  const { test } = useEditingTest();

  const testTags = (test?.tags ?? []).map((tag) => tag.name);

  const tagsAvailableForAdding = (project?.tags ?? []).filter(
    (tag) => !testTags.includes(tag.name),
  );

  /************** keyboard  **************/

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Escape":
        handleKeyDownEscape();
        break;
      case "Tab":
        handleKeyDownTab(event);
        break;
      case "Enter":
        handleKeyDownEnter(event);
        break;
      case "ArrowUp":
        handleKeyDownArrowUp(event);
        break;
      case "ArrowDown":
        handleKeyDownArrowDown(event);
        break;
    }
  };

  const handleKeyDownEscape = () => {
    if (tagSuggestIsOpen) {
      setTagSuggestIsOpen(false);
    }
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownTabOrEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log("handleKeyDownTabOrEnter", { tagSuggestIsOpen });
    if (tagSuggestIsOpen) {
      event.preventDefault();
      handleTagSuggestSelectTag(tagSuggestHighlightedTag);
    }
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const newHighlightedTag = tagSuggestHighlightedTag
      ? tagsAvailableForAdding[
          tagsAvailableForAdding.indexOf(tagSuggestHighlightedTag) - 1
        ] ?? tagsAvailableForAdding.slice(-1)[0]
      : tagsAvailableForAdding[0];

    setTagSuggestIsOpen(true);
    setTagSuggestHighlightedTag(newHighlightedTag);
  };

  const handleKeyDownArrowDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const currentHighlightedTag = tagSuggestHighlightedTag
      ? tagSuggestHighlightedTag
      : tagsAvailableForAdding[0];

    const newHighlightedTag =
      tagsAvailableForAdding[
        tagsAvailableForAdding.indexOf(currentHighlightedTag) + 1
      ] ?? tagsAvailableForAdding[0];

    setTagSuggestIsOpen(true);
    setTagSuggestHighlightedTag(newHighlightedTag);
  };

  const [tagSuggestFilterText, setTagSuggestFilterText] =
    useState<Maybe<string>>(); //inputTagSelectionInfo?.valueBetweenBrackets;

  /************** input  **************/

  const inputLastEvent = useRef<Maybe<"input" | "select">>();

  const handleInputInput = (event: FormEvent<HTMLInputElement>) => {
    // inputLastEvent.current = "input";

    // const newInputTagSelectionInfo = getInputTagSelectionInfo(
    //   event.currentTarget,
    // );

    // const newFilterText =
    //   newInputTagSelectionInfo?.valueBetweenBracketsBeforeCursor;

    // const isFiltering = Boolean(newFilterText);

    // const filteredTags = isFiltering
    //   ? filterTags(project?.tags, newFilterText)
    //   : project?.tags;

    // const highlightedTag = isFiltering
    //   ? filteredTags?.[0] ?? project?.tags?.[0]
    //   : project?.tags?.[0];

    const filterText = (event as ChangeEvent<HTMLInputElement>).target.value;

    setTagSuggestFilterText(filterText);
    // setTagSuggestHighlightedTag(highlightedTag);

    params.onInput?.(event);
  };

  const handleInputBlur = async (event: FocusEvent<HTMLInputElement>) => {
    await timeout(100);
    setTagSuggestIsOpen(false);
  };

  const handleInputFocus = () => {
    setTagSuggestIsOpen(true);
  };

  const handleTagSuggestClose = () => {};

  const handleTagSuggestSelectTag = async (tag?: Tag) => {
    if (!textBoxRef.current || !tag) {
      return;
    }

    textBoxRef.current.value = tag.title;

    // params.input.onChange(tag?.title ?? "");

    setTagSuggestIsOpen(false);

    params.onSuggestionSelect(tag.title);
  };

  const textBoxRef = useRef<HTMLInputElement>(null);

  return {
    tagSuggest: {
      isOpen: tagSuggestIsOpen,
      highlightedTag: tagSuggestHighlightedTag,
      filterText: tagSuggestFilterText,
      containerRef: tagSuggestContainerRef,
      handleClose: handleTagSuggestClose,
      handleSelectTag: handleTagSuggestSelectTag,
    },
    input: {
      textBoxRef,
      handleKeyDown: handleInputKeyDown,
      handleInput: handleInputInput,
      handleBlur: handleInputBlur,
      handleFocus: handleInputFocus,
    },
  };
}
