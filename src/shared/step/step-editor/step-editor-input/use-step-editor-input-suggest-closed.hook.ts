import "../../../utils";
import { timeout } from "../../../utils";

import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorInputSuggestClosed(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { params, state, setState, textAreaRef } = common;

  const handleKeyDownEnterSuggestClosed = () => {
    params.onGoNext();
  };

  const handleKeyDownEscapeSuggestClosed = async () => {
    setState({
      ...state,
      input: {
        ...state.input,
        value: params.step.text,
      },
    });

    await timeout();

    textAreaRef?.current?.blur();
  };

  const handleKeyDownArrowUpSuggestClosed = () => {
    params.onGoPrevious();
  };

  const handleKeyDownArrowDownSuggestClosed = () => {
    params.onGoNext();
  };

  return {
    handleKeyDownEnterSuggestClosed,
    handleKeyDownEscapeSuggestClosed,
    handleKeyDownArrowUpSuggestClosed,
    handleKeyDownArrowDownSuggestClosed,
  };
}
