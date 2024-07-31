import { Tag } from "testmatic";

import "../../../utils";

import { getStepEditorInputValueWithTagInserted } from "./step-editor-input-selection";
import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorAutoCompleteTag({
  textAreaRef,
  inputLastEvent,
  state,
  setState,
}: ReturnType<typeof useStepEditorInputCommon>) {
  const autoCompleteTag = (tag?: Tag) => {
    inputLastEvent.current = "select-suggestion";

    if (!state.input.selectionInfo || !tag) {
      return;
    }

    const value = getStepEditorInputValueWithTagInserted({
      tag: tag,
      currentValue: state.input.value,
      selectionInfo: state.input.selectionInfo,
    });

    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        value,
      },
      suggest: {
        ...previousState.suggest,
        isOpen: false,
      },
    }));

    textAreaRef.current?.focus();
  };

  return { autoCompleteTag };
}
