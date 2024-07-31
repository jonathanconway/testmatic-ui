import "../../../utils";

import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";
import { useStepEditorInputInput } from "./use-step-editor-input-input.hook";
import { useStepEditorInputMeasurer } from "./use-step-editor-input-measurer.hook";
import { useStepEditorInputSuggest } from "./use-step-editor-input-suggest.hook";
import { UseStepEditorInputParams } from "./use-step-editor-input.types";

export function useStepEditorInput(params: UseStepEditorInputParams) {
  const common = useStepEditorInputCommon(params);

  const input = useStepEditorInputInput(common);
  const suggest = useStepEditorInputSuggest(common);
  const measurer = useStepEditorInputMeasurer(common);

  return {
    input,
    measurer,
    suggest,
  };
}
