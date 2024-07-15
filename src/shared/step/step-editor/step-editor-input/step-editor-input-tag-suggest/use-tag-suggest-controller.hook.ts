import {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Tag, isTag, projectGetTagByNameOrTitle } from "testmatic";

import { useProject } from "../../../../project";
import { Maybe } from "../../../../utils";

import { filterTags } from "./tag-suggest-filter-tags";
import {
  InputTagSelectionInfo,
  getInputTagSelectionInfo,
} from "./tag-suggest-selection-info";

interface UseTagSuggestControllerParams {
  readonly input: {
    readonly value: string;
    readonly onChange: (newValue: string) => void;
    readonly ref: MutableRefObject<HTMLTextAreaElement | null>;
  };
}

export function useTagSuggestController(params: UseTagSuggestControllerParams) {
  const [inputTagSelectionInfo, setInputTagSelectionInfo] =
    useState<Maybe<InputTagSelectionInfo>>();

  const [tagSuggestHighlightedTag, setTagSuggestHighlightedTag] =
    useState<Maybe<Tag>>();

  const [tagSuggestIsOpen, setTagSuggestIsOpen] = useState(false);

  const { project } = useProject();

  /************** keyboard  **************/

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDownTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownTabOrEnter = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (tagSuggestIsOpen) {
      event.preventDefault();
      handleTagSuggestSelectTag(tagSuggestHighlightedTag);
    }
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!project) {
      return;
    }

    event.preventDefault();

    const { tags } = project;

    const newHighlightedTag = tagSuggestHighlightedTag
      ? tags[tags.indexOf(tagSuggestHighlightedTag) - 1] ?? tags.slice(-1)[0]
      : tags[0];

    setTagSuggestHighlightedTag(newHighlightedTag);
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (!project) {
      return;
    }

    event.preventDefault();

    const { tags } = project;

    const newHighlightedTag = tagSuggestHighlightedTag
      ? tags[tags.indexOf(tagSuggestHighlightedTag) + 1] ?? tags[0]
      : tags[0];

    setTagSuggestHighlightedTag(newHighlightedTag);
  };

  const [tagSuggestFilterText, setTagSuggestFilterText] =
    useState<Maybe<string>>(); //inputTagSelectionInfo?.valueBetweenBrackets;

  /************** input  **************/

  const inputLastEvent = useRef<Maybe<"input" | "select">>();

  const handleInputSelect = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;

    const newInputTagSelectionInfo = getInputTagSelectionInfo(target);

    if (inputLastEvent.current === "select") {
      setTagSuggestFilterText(undefined);
    }
    inputLastEvent.current = "select";

    if (!newInputTagSelectionInfo) {
      setTagSuggestIsOpen(false);
      return;
    }

    setInputTagSelectionInfo(newInputTagSelectionInfo);

    if (!project) {
      setTagSuggestIsOpen(false);
      return;
    }

    const lookupTagNameOrTitle = newInputTagSelectionInfo.valueBetweenBrackets;

    const selectedTag = projectGetTagByNameOrTitle({
      project,
      lookupTagNameOrTitle,
    });
    const isSelectedTag = isTag(selectedTag);

    setTagSuggestIsOpen(true);

    if (isSelectedTag) {
      setTagSuggestHighlightedTag(selectedTag);
    }
  };

  const handleInputInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    inputLastEvent.current = "input";

    const newInputTagSelectionInfo = getInputTagSelectionInfo(event.target);

    const newFilterText =
      newInputTagSelectionInfo?.valueBetweenBracketsBeforeCursor;

    const isFiltering = Boolean(newFilterText);

    const filteredTags = isFiltering
      ? filterTags(project?.tags, newFilterText)
      : project?.tags;

    const highlightedTag = isFiltering
      ? filteredTags?.[0] ?? project?.tags?.[0]
      : project?.tags?.[0];

    setTagSuggestFilterText(newFilterText);
    setTagSuggestHighlightedTag(highlightedTag);
  };

  const handleInputBlur = () => {
    setTagSuggestIsOpen(false);
  };

  const handleTagSuggestClose = () => {};

  const handleTagSuggestSelectTag = (tag?: Tag) => {
    if (!inputTagSelectionInfo || !tag) {
      return;
    }

    const insertion = `(${tag.title.toLowerCase()})`;
    const beforeInsertion = params.input.value.substring(
      0,
      inputTagSelectionInfo.openBracketIndex - 1,
    );
    const afterInsertion = params.input.value.substring(
      inputTagSelectionInfo.closeBracketIndex + 1,
    );

    const newValue = `${beforeInsertion}${insertion}${afterInsertion}`;

    params.input.onChange(newValue);

    setTagSuggestIsOpen(false);

    setTimeout(() => {
      if (params.input.ref.current) {
        params.input.ref.current.selectionStart =
          params.input.ref.current.selectionEnd =
            beforeInsertion.length + insertion.length;
      }
    });
  };

  const tagSuggestSelectionMeasurerValue = params.input.value
    ?.toString()
    .substring(0, inputTagSelectionInfo?.openBracketIndex);

  return {
    tagSuggest: {
      isOpen: tagSuggestIsOpen,
      highlightedTag: tagSuggestHighlightedTag,
      filterText: tagSuggestFilterText,
      selectionMeasurerValue: tagSuggestSelectionMeasurerValue,
      handleClose: handleTagSuggestClose,
      handleSelectTag: handleTagSuggestSelectTag,
    },
    input: {
      handleKeyDown: handleInputKeyDown,
      handleSelect: handleInputSelect,
      handleInput: handleInputInput,
      handleBlur: handleInputBlur,
    },
  };
}
