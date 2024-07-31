import { useRef } from "react";

import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";

export function useStepEditorInputMeasurer({
  state,
}: ReturnType<typeof useStepEditorInputCommon>) {
  const ref = useRef<HTMLSpanElement>(null);

  const value = state.input.value
    ?.toString()
    .substring(0, state.input.selectionInfo?.openBracketIndex);

  return {
    ref,
    value,
  };
}
