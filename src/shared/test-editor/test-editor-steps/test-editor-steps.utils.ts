import { StepInputClassNames } from "../../step";
import { getElementById, isNotNil, timeoutCall } from "../../utils";

import { TestEditorStepsIds } from "./test-editor-steps.const";

export const focusLastStepInput = async () => {
  focusAndSelectInput(await getLastStepInput());
};

export const focusSecondLastStepInput = () => {
  focusAndSelectInput(getSecondLastStepInput());
};

export const getTestEditorContainer = () =>
  getElementById(TestEditorStepsIds.Container);

export const focusStepInput = (stepIndex: number) => {
  const textArea = getStepTextAreas()[stepIndex];

  focusAndSelectInput(textArea);
};

export const getStepTextAreaAt = (index: number) => getStepTextAreas()[index];

const getStepTextAreas = () => {
  return Array.from(
    getTestEditorContainer().getElementsByClassName(
      StepInputClassNames.TextArea,
    ) ?? [],
  ).filter(isNotNil) as HTMLTextAreaElement[];
};

const getLastStepInput = async () => {
  const textAreas = await timeoutCall(getStepTextAreas);
  const lastTextArea = textAreas.slice(-1)[0];
  return lastTextArea;
};

const getSecondLastStepInput = () => {
  const textAreas = getStepTextAreas();
  const lastTextArea = textAreas.slice(-2)[0];
  return lastTextArea;
};

const focusAndSelectInput = (input: HTMLTextAreaElement) => {
  input.selectionStart = input.value.length;
  input.focus();
};
