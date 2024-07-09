import { isError } from "lodash";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step, createTestStepFromText } from "testmatic";

import { useTest, useTestStep } from "../../../hooks";
import { homeRoute } from "../../../screens";
import { showErrorNotification } from "../../notification";
import { StepInputClassNames } from "../../step";

interface UseTestEditorStepsState {
  readonly editingStep?: Step;
}

export function useTestEditorSteps() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepAdderRef = useRef<HTMLTextAreaElement>(null);

  const { test } = useTest();

  const { updateStep, deleteStep } = useTestStep();

  const [state, setState] = useState<UseTestEditorStepsState>({});

  const navigateTo = useNavigate();

  const handleClickAddStep = () => {
    addNewStep();
  };

  const handleStepEditorClick = (editingStep: Step) => () => {
    setEditingStep(editingStep);
  };

  const handleStepEditorGoPrevious = (stepIndex: number) => () => {
    if (stepIndex <= 0 || !test) {
      return;
    }

    setEditingStep(test.steps[stepIndex - 1]);
  };

  const handleStepEditorGoLast = () => {
    if (!test) {
      return;
    }

    setEditingStep(test.steps[test.steps.length - 1]);
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    console.log("handleStepEditorGoNext", { stepIndex });
    if (!test) {
      return;
    }

    if (stepIndex === test.steps.length - 1) {
      setTimeout(focusStepAdderInput);
      return;
    }

    setEditingStep(test.steps[stepIndex + 1]);
  };

  const handleStepEditorCancel = (editingStepIndex: number) => () => {
    console.log("handleStepEditorCancel");
    setEditingStep(undefined);
  };

  const handleStepEditorEditingStepChange =
    (editingStepIndex: number) => (editingStep: Step) => {
      if (!test) {
        return;
      }

      updateStep(editingStepIndex, editingStep.text);
    };

  const setEditingStep = (editingStep?: Step) => {
    setState((previousState) => ({
      ...previousState,
      editingStep,
    }));
  };

  const addNewStep = (stepText = "") => {
    if (!test) {
      return;
    }

    const newStep = createTestStepFromText(stepText);

    setEditingStep(newStep);

    addNewStep(newStep.text);

    setTimeout(focusLastStepInput);
  };

  const focusLastStepInput = () => {
    const lastTextArea = Array.from(
      stepsContainerRef?.current?.querySelectorAll(
        `textarea.${StepInputClassNames.StepInputTextArea}`,
      ) ?? [],
    ).slice(-1)[0] as HTMLTextAreaElement;

    lastTextArea.selectionStart = lastTextArea.value.length;
  };

  const focusStepAdderInput = () => {
    stepAdderRef.current?.focus();
  };

  const handleStepAdderInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    addNewStep(event.target.value);
  };

  const handleDeleteClick = (deleteStepIndex: number) => () => {
    if (!test) {
      return;
    }

    const deleteStepResult = deleteStep(deleteStepIndex);

    if (isError(deleteStepResult)) {
      showErrorNotification(deleteStepResult);
    }
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  const steps = test?.steps ?? [];

  const editingStep = state.editingStep;

  return {
    stepsContainerRef,
    stepAdderRef,
    test,
    steps,
    editingStep,
    navigateTo,
    handleClickAddStep,
    handleStepEditorClick,
    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleStepEditorCancel,
    handleStepEditorEditingStepChange,
    addNewStep,
    focusLastStepInput,
    focusStepAdderInput,
    handleStepAdderInput,
    handleDeleteClick,
    handleCloseClick,
  };
}
