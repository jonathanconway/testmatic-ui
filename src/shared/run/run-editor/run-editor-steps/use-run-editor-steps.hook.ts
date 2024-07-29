import { useRef } from "react";

import { useStorage } from "../../../../hooks";
import { showSuccessOrErrorNotification } from "../../../notification";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorSteps() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const { test, run } = useEditingRun();

  const { updateTestRunStepIsCompleted } = useStorage();

  const handleClickStepCompleted = (stepIndex: number) => {
    const lookupTestName = test?.name;
    const lookupRunDateTime = run?.dateTime;
    const lookupStepIndex = stepIndex;
    const stepIsCompleted = !run?.steps[stepIndex].isCompleted;

    if (!lookupTestName || !lookupRunDateTime) {
      return;
    }

    const updateTestRunStepIsCompletedResult = updateTestRunStepIsCompleted(
      lookupTestName,
      lookupRunDateTime,
      lookupStepIndex,
      stepIsCompleted,
    );

    showSuccessOrErrorNotification(updateTestRunStepIsCompletedResult, {
      anchorElement: getStepListItemElementAtIndex(stepIndex),
    });
  };

  const getStepListItemElementAtIndex = (stepIndex: number) => {
    const stepListItemElements = Array.from(
      stepsContainerRef.current?.querySelectorAll("li") ?? [],
    );
    return stepListItemElements[stepIndex];
  };

  const steps = run?.steps ?? [];

  const completed = Object.fromEntries(
    steps.map((step, stepIndex) => [stepIndex, step.isCompleted]) ?? [],
  );

  return {
    steps,
    completed,
    stepsContainerRef,

    handleClickStepCompleted,
  };
}
