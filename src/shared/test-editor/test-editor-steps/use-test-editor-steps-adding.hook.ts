import { ChangeEvent, FormEvent, useState } from "react";
import { Step, createTestStepFromText } from "testmatic";

import { useTestStep } from "../../../hooks";
import {
  NotificationFormats,
  showSuccessOrErrorNotification,
} from "../../notification";
import { timeout } from "../../utils";

import {
  focusLastStepInput,
  focusSecondLastStepInput,
  getTestEditorContainer,
} from "./test-editor-steps.utils";

interface UseTestEditorStepsAddingState {
  readonly addingStep: Step;
  readonly isAddingStep: boolean;
}

export function useTestEditorStepsAdding() {
  const { addNewStep } = useTestStep();

  const [state, setState] = useState<UseTestEditorStepsAddingState>({
    addingStep: createTestStepFromText(""),
    isAddingStep: false,
  });

  const { isAddingStep, addingStep } = state;

  const handleAddingStepEditorBlur = async (
    event: FormEvent<HTMLTextAreaElement>,
  ) => {
    const editingStepText = (event as ChangeEvent<HTMLTextAreaElement>).target
      .value;
    if (editingStepText === "") {
      return;
    }

    const result = await addNewStep(editingStepText);

    setState((previousState) => ({
      ...previousState,
      addingStep: createTestStepFromText(""),
      isAddingStep: false,
    }));

    await timeout(100);

    showSuccessOrErrorNotification(result, {
      anchorElement: getTestEditorContainer(),
      format: NotificationFormats.Icon,
      offset: {
        top: 20,
      },
    });
  };

  const handleAddingStepEditorGoPrevious = () => {
    focusSecondLastStepInput();
  };

  const handleClickAddStep = () => {
    addNewStep("");
    setTimeout(focusLastStepInput);
  };

  return {
    isAddingStep,
    addingStep,
    handleAddingStepEditorBlur,
    handleAddingStepEditorGoPrevious,
    handleClickAddStep,
  };
}
