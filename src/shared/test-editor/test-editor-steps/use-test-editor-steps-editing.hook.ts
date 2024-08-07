import { ChangeEvent, FormEvent } from "react";
import { createTestStepFromText } from "testmatic";

import { useTestStep } from "../../../hooks";
import {
  NotificationFormats,
  showSuccessOrErrorNotification,
} from "../../notification";
import { timeout } from "../../utils";
import { useEditingTest } from "../use-editing-test.hook";

import {
  focusStepInput,
  getStepTextAreaAt,
  getTestEditorContainer,
} from "./test-editor-steps.utils";

export function useTestEditorStepsEditing() {
  const { test } = useEditingTest();

  const { updateStep, deleteStep } = useTestStep();

  const handleStepEditorGoPrevious = (stepIndex: number) => () => {
    if (stepIndex <= 0) {
      return;
    }

    focusStepInput(stepIndex - 1);
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    focusStepInput(stepIndex + 1);
  };

  const handleStepEditorBlur =
    (editingStepIndex: number) =>
    async (event: FormEvent<HTMLTextAreaElement>) => {
      const target = (event as ChangeEvent<HTMLTextAreaElement>).target;
      const editingStepText = target.value.trim();

      if (editingStepText === steps[editingStepIndex].text) {
        return;
      }

      const editingStep = createTestStepFromText(editingStepText);

      const result = await updateStep(editingStepIndex, editingStep.text);

      await timeout();

      showSuccessOrErrorNotification(result, {
        anchorElement: getStepTextAreaAt(editingStepIndex).parentElement,
        format: NotificationFormats.Icon,
      });
    };

  const handleStepEditorDeleteClick = (deleteStepIndex: number) => async () => {
    const result = await deleteStep(deleteStepIndex);

    await timeout();

    showSuccessOrErrorNotification(result, {
      anchorElement: getTestEditorContainer(),
      format: NotificationFormats.Icon,
    });
  };

  const steps = test?.steps ?? [];

  return {
    steps,

    handleStepEditorGoPrevious,
    handleStepEditorGoNext,
    handleStepEditorBlur,
    handleStepEditorDeleteClick,
  };
}
