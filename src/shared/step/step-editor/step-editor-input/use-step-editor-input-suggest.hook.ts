import { Tag } from "testmatic";

import { useStepEditorAutoCompleteTag } from "./use-step-editor-auto-complete-tag.hook";
import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorInputSuggest(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { state, setSuggestIsOpen } = common;

  const { autoCompleteTag } = useStepEditorAutoCompleteTag(common);

  const handleSelect = (tag?: Tag) => {
    autoCompleteTag(tag);
  };

  const handleClose = () => {
    setSuggestIsOpen(false);
  };

  return {
    isOpen: state.suggest.isOpen,
    filterText: state.suggest.filterText,
    highlightedTag: state.suggest.highlightedSuggestion,
    suggestions: state.suggest.suggestions,
    handleSelect,
    handleClose,
  };
}
