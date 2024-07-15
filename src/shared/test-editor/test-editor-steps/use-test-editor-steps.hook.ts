import { isError } from "lodash";
import { ChangeEvent, MouseEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Step, createTestStepFromText } from "testmatic";

import { useTest, useTestStep } from "../../../hooks";
import { homeRoute } from "../../../screens";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification";
import { StepInputClassNames } from "../../step";
import { isNotNil, timeout } from "../../utils";

export function useTestEditorSteps() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepAdderRef = useRef<HTMLTextAreaElement>(null);

  const { test } = useTest();

  const { addNewStep, updateStep, deleteStep } = useTestStep();

  const navigateTo = useNavigate();

  const handleClickAddStep = () => {
    handleAddNewStep();
  };

  const getStepTextAreas = () => {
    return Array.from(
      stepsContainerRef.current?.querySelectorAll(
        `.${StepInputClassNames.StepInputTextArea}`,
      ) ?? [],
    ).filter(isNotNil) as HTMLTextAreaElement[];
  };

  const getStepTextAreaAt = (index: number) => getStepTextAreas()[index];

  const focusStepInput = (stepIndex: number) => {
    const textArea = getStepTextAreas()[stepIndex];

    focusAndSelectInput(textArea);
  };

  const focusLastStepInput = () => {
    const textAreas = getStepTextAreas();
    const lastTextArea = textAreas.slice(-1)[0];

    focusAndSelectInput(lastTextArea);
  };

  const focusAndSelectInput = (input: HTMLTextAreaElement) => {
    input.selectionStart = input.value.length;
    input.focus();
  };

  const handleStepEditorGoPrevious = (stepIndex: number) => () => {
    if (stepIndex <= 0 || !test) {
      return;
    }

    focusStepInput(stepIndex - 1);
  };

  const handleStepEditorGoLast = () => {
    if (!test) {
      return;
    }

    focusStepInput(test.steps.length - 1);
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    if (!test) {
      return;
    }

    if (stepIndex === test.steps.length - 1) {
      setTimeout(focusStepAdderInput);
      return;
    }

    focusStepInput(stepIndex + 1);
  };

  const handleStepEditorChange =
    (editingStepIndex: number) => async (editingStep: Step) => {
      if (!test) {
        return;
      }

      const updateStepResult = await updateStep(
        editingStepIndex,
        editingStep.text,
      );

      if (isError(updateStepResult)) {
        showErrorNotification(updateStepResult);
        return;
      }

      // Wait for some DOM tasks to complete, which would otherwise disrupt the notification
      await timeout(250);

      const anchorElement = getStepTextAreaAt(editingStepIndex).parentElement;

      showSuccessNotification("Updated", {
        anchorElement,
      });
    };

  const handleAddNewStep = (stepText = "") => {
    if (!test) {
      return;
    }

    const newStep = createTestStepFromText(stepText);

    addNewStep(newStep.text);

    setTimeout(focusLastStepInput);
  };

  const focusStepAdderInput = () => {
    stepAdderRef.current?.focus();
  };

  const handleStepAdderInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleAddNewStep(event.target.value);
  };

  const handleDeleteClick =
    (deleteStepIndex: number) => (event: MouseEvent<HTMLButtonElement>) => {
      if (!test) {
        return;
      }

      const deleteStepResult = deleteStep(deleteStepIndex);

      if (isError(deleteStepResult)) {
        showErrorNotification(deleteStepResult);
        return;
      }

      showSuccessNotification("Deleted", {
        anchorElement: event.currentTarget,
      });
    };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  const steps = test?.steps ?? [];

  return {
    stepsContainerRef,
    stepAdderRef,
    steps,

    handleClickAddStep,
    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleStepEditorChange,
    handleStepAdderInput,
    handleDeleteClick,
    handleCloseClick,
  };
}
