import { debounce, isError } from "lodash";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Step, createTestStepFromText } from "testmatic";

import { useTestStep } from "../../../hooks";
import { homeRoute } from "../../../screens";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification";
import { StepInputClassNames } from "../../step";
import { isNotNil, timeout } from "../../utils";
import { useEditingTest } from "../use-editing-test.hook";

import { TestEditorStepsIds } from "./test-editor-steps.const";

interface UseTestEditorStepsState {
  readonly addingStep?: Step;
}

export function useTestEditorSteps() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepAdderRef = useRef<HTMLTextAreaElement>(null);
  const afterFocusRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<UseTestEditorStepsState>({});

  const { test } = useEditingTest();

  const { addNewStep, updateStep, deleteStep } = useTestStep();

  const navigateTo = useNavigate();

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

  const handleClickAddStep = () => {
    addNewStep("");
    setTimeout(focusLastStepInput);
  };

  const getLastStepInput = () => {
    const textAreas = getStepTextAreas();
    const lastTextArea = textAreas.slice(-1)[0];
    return lastTextArea;
  };

  const focusLastStepInput = () => {
    focusAndSelectInput(getLastStepInput());
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

  const handleStepEditorGoLast = () => {
    focusStepInput(test.steps.length - 1);
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    if (stepIndex === test.steps.length - 1) {
      setTimeout(focusStepAdderInput);
      return;
    }

    focusStepInput(stepIndex + 1);
  };

  const handleStepEditorChange =
    (editingStepIndex: number) => async (editingStep: Step) => {
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

  const focusStepAdderInput = () => {
    stepAdderRef.current?.focus();
  };

  const handleStepAdderInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const newStepText = event.target.value;
    // if (!newStepText.trim()) {
    //   return;
    // }
    // const newStep = createTestStepFromText(newStepText);
    // addNewStep(newStep.text);
    // event.target.value = "";
    // setTimeout(() => {
    //   stepAdderRef.current?.focus();
    // });
  };

  const handleStepEditorDeleteClick =
    (deleteStepIndex: number) => (event: MouseEvent<HTMLButtonElement>) => {
      const deleteStepResult = deleteStep(deleteStepIndex);

      if (isError(deleteStepResult)) {
        showErrorNotification(deleteStepResult);
        return;
      }

      setTimeout(() => {
        showSuccessNotification("Deleted", {
          anchorElement: getContainerElement(),
        });
      });
    };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  const handleStepAdderFocus = () => {
    // if (state.addingStep) {
    //   // User was already adding a step. To avoid focus trap, move to the next element.
    //   console.log("afterFocusRef.current", afterFocusRef.current);
    //   setTimeout(() => {
    //     console.log("afterFocusRef.current2", afterFocusRef.current);
    //     afterFocusRef.current?.focus();
    //   }, 100);
    // }
    // setState({
    //   addingStep: {
    //     text: "",
    //     tags: [],
    //   },
    // });
    // focusAddingStep();
  };

  const addingStepRef = useRef<HTMLTextAreaElement>(null);

  const focusAddingStep = () => {
    setTimeout(focusLastStepInput);
  };

  const steps = test?.steps ?? [];

  const addingStep = state.addingStep;

  const handleAddingStepEditorChange = async (step: Step, event: any) => {
    // console.log("handleAddingStepEditorChange", step);
    // if (!step.text) {
    //   setState({
    //     addingStep: undefined,
    //   });

    //   console.log("handleAddingStepEditorChange2", stepsContainerRef.current);
    //   // console.log("handleAddingStepEditorBlur");
    //   stepsContainerRef.current?.focus();
    //   return;
    // }

    const addNewStepResult = await addNewStep(step.text);

    if (isError(addNewStepResult)) {
      showErrorNotification(addNewStepResult, {
        anchorElement: getContainerElement(),
      });
      return;
    }

    setState({
      addingStep: undefined,
    });

    setTimeout(() => {
      showSuccessNotification("Added step", {
        anchorElement: getLastStepInput(),
      });
    });

    focusLastStepInput();
  };

  const handleAddingStepEditorGoPrevious = () => {};

  const handleAddingStepEditorGoNext = () => {};

  const handleAddingStepDeleteClick = () => {};

  const handleAddingStepEditorBlur = async () => {};

  const getContainerElement = () =>
    window.document.getElementById(TestEditorStepsIds.Container);

  const handleAddingStepEditorInput = debounce(
    (event: FormEvent<HTMLTextAreaElement>) => {
      const target = event.target as HTMLTextAreaElement;

      if (!target) {
        return;
      }

      const stepText = target.value;

      addNewStep(stepText);

      setTimeout(() => {
        showSuccessNotification("Added step", {
          anchorElement: getContainerElement(),
        });

        focusLastStepInput();
      });

      target.value = "";
    },
    500,
  );

  return {
    stepsContainerRef,
    stepAdderRef,
    steps,

    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleStepEditorChange,
    handleStepEditorDeleteClick,

    handleStepAdderInput,
    handleStepAdderFocus,

    // todo: extract to another hook
    addingStepRef,
    addingStep,
    afterFocusRef,
    handleAddingStepEditorChange,
    handleAddingStepEditorGoPrevious,
    handleAddingStepEditorGoNext,
    handleAddingStepDeleteClick,
    handleAddingStepEditorBlur,
    handleAddingStepEditorInput,

    handleClickAddStep,
    handleCloseClick,
  };
}
