import {
  FocusEvent,
  FocusEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { Step } from "testmatic";

import "../../utils";

interface UseStepEditorParams {
  readonly step: Step;
  readonly stepIndex: number;

  readonly onFocus?: FocusEventHandler;
  readonly onBlur?: FocusEventHandler;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: MouseEventHandler;
}

interface UseStepEditorState {
  readonly isEditing: boolean;
}

export function useStepEditor(params: UseStepEditorParams) {
  const [state, setState] = useState<UseStepEditorState>({ isEditing: false });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleStepInputFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setState({ isEditing: true });

    params.onFocus?.(event);
  };

  const handleStepInputBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setState({ isEditing: false });

    params.onBlur?.(event);
  };

  return {
    containerRef,
    isEditing: state.isEditing,
    handleStepInputFocus,
    handleStepInputBlur,
  };
}
