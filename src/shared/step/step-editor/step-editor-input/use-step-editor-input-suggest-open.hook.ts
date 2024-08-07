import { last } from "lodash";
import { KeyboardEvent } from "react";

import "../../../utils";

import { useStepEditorAutoCompleteTag } from "./use-step-editor-auto-complete-tag.hook";
import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorInputSuggestOpen(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { state, setSuggestIsOpen, setState } = common;

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
    const currentHighlightedSuggestion =
      state.suggest.highlightedSuggestion ?? state.suggest.suggestions[0];

    const suggestions = state.suggest.suggestions;

    const highlightedSuggestion =
      suggestions[suggestions.indexOf(currentHighlightedSuggestion) - 1] ??
      last(suggestions);

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion,
      },
    });
  };

  const handleKeyDownArrowDownSuggestOpen = () => {
    const currentHighlightedSuggestion =
      state.suggest.highlightedSuggestion ?? state.suggest.suggestions[0];

    const suggestions = state.suggest.suggestions;

    const highlightedSuggestion =
      suggestions[suggestions.indexOf(currentHighlightedSuggestion) + 1] ??
      suggestions[0];

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion,
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
