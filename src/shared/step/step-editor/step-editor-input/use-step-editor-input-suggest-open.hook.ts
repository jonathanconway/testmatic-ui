import { last } from "lodash";
import { KeyboardEvent } from "react";

import { useProject } from "../../../../hooks";
import "../../../utils";

import { useStepEditorAutoCompleteTag } from "./use-step-editor-auto-complete-tag.hook";
import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorInputSuggestOpen(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { state, setSuggestIsOpen, setState } = common;

  const { project } = useProject();

  const { autoCompleteTag } = useStepEditorAutoCompleteTag(common);

  const handleKeyDownEnterSuggestOpen = () => {
    autoCompleteTag(state.suggest.highlightedSuggestion);
  };

  const handleKeyDownTabSuggestOpen = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    autoCompleteTag(state.suggest.highlightedSuggestion);
  };

  const handleKeyDownEscapeSuggestOpen = () => {
    setSuggestIsOpen(false);
  };

  const handleKeyDownArrowUpSuggestOpen = () => {
    const { tags } = project;

    const newHighlightedTag = state.suggest.highlightedSuggestion
      ? tags[tags.indexOf(state.suggest.highlightedSuggestion) - 1] ??
        last(tags)
      : tags[0];

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion: newHighlightedTag,
      },
    });
  };

  const handleKeyDownArrowDownSuggestOpen = () => {
    const { tags } = project;

    const currentHighlightedTag = state.suggest.highlightedSuggestion
      ? state.suggest.highlightedSuggestion
      : tags[0];

    const newHighlightedTag =
      tags[tags.indexOf(currentHighlightedTag) + 1] ?? tags[0];

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion: newHighlightedTag,
      },
    });
  };

  return {
    handleKeyDownEnterSuggestOpen,
    handleKeyDownTabSuggestOpen,
    handleKeyDownEscapeSuggestOpen,
    handleKeyDownArrowUpSuggestOpen,
    handleKeyDownArrowDownSuggestOpen,
  };
}
