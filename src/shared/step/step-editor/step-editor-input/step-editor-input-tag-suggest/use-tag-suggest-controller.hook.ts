import { useGetProject } from "../../../../project";
import { Maybe } from "../../../../utils";
import { filterTags } from "./tag-suggest-filter-tags";
import {
  InputTagSelectionInfo,
  getInputTagSelectionInfo,
} from "./tag-suggest-selection-info";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Tag, isTag, projectGetTagByNameOrTitle } from "testmatic";

export function useTagSuggestController(props: {
  readonly input: {
    readonly value: string;
    readonly onChange: (newValue: string) => void;
  };
}) {
  const [inputTagSelectionInfo, setInputTagSelectionInfo] =
    useState<Maybe<InputTagSelectionInfo>>();

  const [tagSuggestHighlightedTag, setTagSuggestHighlightedTag] =
    useState<Maybe<Tag>>();

  const [tagSuggestIsOpen, setTagSuggestIsOpen] = useState(false);

  const { data: project } = useGetProject();

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
    event: KeyboardEvent<HTMLTextAreaElement>
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
    event: KeyboardEvent<HTMLTextAreaElement>
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

    // setHighlightedTag(newInputTagSelectionInfo.valueBetweenBrackets)

    const tagNameOrTitle = newInputTagSelectionInfo.valueBetweenBrackets;

    const selectedTag = projectGetTagByNameOrTitle({
      project,
      tagNameOrTitle,
    });
    const isSelectedTag = isTag(selectedTag);
    // const selectedTagOrUndefined = isTag(selectedTag) ? selectedTag : undefined;

    setTagSuggestIsOpen(true);
    // console.log("onInputSelect", { isSelectedTag, newInputTagSelectionInfo });

    if (isSelectedTag) {
      setTagSuggestHighlightedTag(selectedTag);
    }
    // setTimeout(() => {
    //   // s.log(
    //   //   "handleInputSelect setTagSuggestFilterText",
    //   //   newInputTagSelectionInfo
    //   // );
    //   setTagSuggestFilterText(
    //     newInputTagSelectionInfo.valueBetweenBracketsBeforeCursor
    //   );
    // });
    // console.log(
    //   "handleInputSelect",
    //   inputTagSelectionInfo?.valueBetweenBrackets
    // );

    // setStateTextAreaSelection(newInputTagSelectionInfo);
    // });
  };

  const handleInputInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    inputLastEvent.current = "input";

    // setTimeout(() => {
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
    // }, 100);
  };

  const handleTagSuggestClose = () => {
    // console.log("handleClose");
  };

  const handleTagSuggestSelectTag = (tag?: Tag) => {
    if (!inputTagSelectionInfo || !tag) {
      return;
    }

    const insertion = `(${tag.title.toLowerCase()})`;
    const beforeInsertion = props.input.value.substring(
      0,
      inputTagSelectionInfo.openBracketIndex - 1
    );
    const afterInsertion = props.input.value.substring(
      inputTagSelectionInfo.closeBracketIndex + 1
    );

    const newValue = `${beforeInsertion}${insertion}${afterInsertion}`;

    props.input.onChange(newValue);

    setTagSuggestIsOpen(false);
  };

  const tagSuggestSelectionMeasurerValue = props.input.value
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
    },
  };
}
