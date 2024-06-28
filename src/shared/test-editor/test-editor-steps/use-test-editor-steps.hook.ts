import { homeRoute } from "../../../screens";
import { StepInputClassNames } from "../../step";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step, Test, createTestStepFromText } from "testmatic";

interface UseTestEditorStepsProps {
  readonly test?: Test;
  readonly onChange: (updatedTest: Test) => void;
}

interface UseTestEditorStepsState {
  readonly editingStep?: Step;
}

export function useTestEditorSteps(props: UseTestEditorStepsProps) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepAdderRef = useRef<HTMLTextAreaElement>(null);

  const test = props.test;

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
    setEditingStep(undefined);
  };

  const handleStepEditorEditingStepChange =
    (editingStepIndex: number) => (editingStep: Step) => {
      if (!test) {
        return;
      }

      props.onChange({
        ...test,
        steps: test.steps.map((step, stepIndex) =>
          stepIndex === editingStepIndex ? editingStep : step
        ),
      });
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

    props.onChange({
      ...test,
      steps: [...test.steps, newStep],
    });

    setTimeout(focusLastStepInput);
  };

  const focusLastStepInput = () => {
    const lastTextArea = Array.from(
      stepsContainerRef?.current?.querySelectorAll(
        `textarea.${StepInputClassNames.StepInputTextArea}`
      ) ?? []
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

    props.onChange({
      ...test,
      steps: test.steps.filter((_, stepIndex) => stepIndex !== deleteStepIndex),
    });
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
