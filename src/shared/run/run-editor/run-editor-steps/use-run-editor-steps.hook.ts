import { useState } from "react";
import { Test } from "testmatic";

interface UseRunEditorStepsParams {
  readonly test?: Test;
}

interface UseRunEditorStepsState {
  readonly completed: Record<number, boolean>;
}

export function useRunEditorSteps(params: UseRunEditorStepsParams) {
  const [state, setState] = useState<UseRunEditorStepsState>({
    completed: {},
  });

  const handleClickStepCompleted = (stepIndex: number) => {
    setState((previousState) => ({
      ...previousState,
      completed: {
        ...state.completed,
        [stepIndex]: state.completed[stepIndex] ? false : true,
      },
    }));
  };

  const steps = params.test?.steps ?? [];

  const completed = state.completed;

  return {
    steps,
    completed,

    handleClickStepCompleted,
  };
}
