import { isError } from "lodash";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step, createTestStepFromText } from "testmatic";

import { useTestStep } from "../../../hooks";
import { homeRoute } from "../../../screens";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification";
import { StepInputClassNames } from "../../step";
import { isNotNil, timeout, timeoutCall } from "../../utils";
import { useEditingTest } from "../use-editing-test.hook";

interface UseTestEditorStepsState {
  readonly addingStep: Step;
  readonly isAddingStep: boolean;
}

export function useTestEditorSteps() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<UseTestEditorStepsState>({
    addingStep: createTestStepFromText(""),
    isAddingStep: false,
  });

  const { test } = useEditingTest();

  const { addNewStep, updateStep, deleteStep } = useTestStep();

  const navigateTo = useNavigate();

  const getStepTextAreaAt = (index: number) => getStepTextAreas()[index];

  const handleClickAddStep = () => {
    addNewStep("");
    setTimeout(focusLastStepInput);
  };

  const getLastStepInput = async () => {
    const textAreas = await timeoutCall(getStepTextAreas);
    const lastTextArea = textAreas.slice(-1)[0];
    return lastTextArea;
  };

  const focusLastStepInput = async () => {
    focusAndSelectInput(await getLastStepInput());
  };

  const getSecondLastStepInput = () => {
    const textAreas = getStepTextAreas();
    const lastTextArea = textAreas.slice(-2)[0];
    return lastTextArea;
  };

  const getStepTextAreas = () => {
    return Array.from(
      stepsContainerRef.current?.getElementsByClassName(
        StepInputClassNames.TextArea,
      ) ?? [],
    ).filter(isNotNil) as HTMLTextAreaElement[];
  };

  const focusSecondLastStepInput = () => {
    focusAndSelectInput(getSecondLastStepInput());
  };

  const focusAndSelectInput = (input: HTMLTextAreaElement) => {
    input.selectionStart = input.value.length;
    input.focus();
  };

  const handleStepEditorGoPrevious = (stepIndex: number) => () => {
    if (stepIndex <= 0) {
      return;
    }

    focusStepInput(stepIndex - 1);
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    focusStepInput(stepIndex + 1);
  };

  const focusStepInput = (stepIndex: number) => {
    const textArea = getStepTextAreas()[stepIndex];

    focusAndSelectInput(textArea);
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

  const handleStepEditorDeleteClick = (deleteStepIndex: number) => () => {
    const deleteStepResult = deleteStep(deleteStepIndex);

    if (isError(deleteStepResult)) {
      showErrorNotification(deleteStepResult);
      return;
    }

    setTimeout(() => {
      showSuccessNotification("Deleted", {
        anchorElement: stepsContainerRef.current,
      });
    });
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  const steps = test?.steps ?? [];

  const addingStep = state.addingStep;

  const handleAddingStepEditorBlur = async (
    event: FormEvent<HTMLTextAreaElement>,
  ) => {
    const editingStepText = (event as ChangeEvent<HTMLTextAreaElement>).target
      .value;
    if (editingStepText === "") {
      return;
    }

    const addNewStepResult = await addNewStep(editingStepText);

    if (isError(addNewStepResult)) {
      showErrorNotification(addNewStepResult, {
        anchorElement: stepsContainerRef.current,
      });
      return;
    }

    setState((previousState) => ({
      ...previousState,
      addingStep: createTestStepFromText(""),
      isAddingStep: false,
    }));

    await timeout();

    showSuccessNotification("Added step", {
      anchorElement: await getLastStepInput(),
    });
  };

  const handleAddingStepEditorGoPrevious = () => {
    focusSecondLastStepInput();
  };

  const { isAddingStep } = state;

  return {
    stepsContainerRef,
    steps,

    handleStepEditorGoPrevious,
    handleStepEditorGoNext,
    handleStepEditorBlur,
    handleStepEditorDeleteClick,

    // todo: extract to another hook
    isAddingStep,
    addingStep,
    handleAddingStepEditorBlur,
    handleAddingStepEditorGoPrevious,

    handleClickAddStep,
    handleCloseClick,
  };
}
