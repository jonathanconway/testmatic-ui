import { getStorageFns } from "../../../../hooks";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorSteps() {
  const { test, run } = useEditingRun();

  const { updateTestRunStepIsCompleted } = getStorageFns();

  const handleClickStepCompleted = (stepIndex: number) => {
    const lookupTestName = test?.name;
    const lookupRunDateTime = run?.dateTime;
    const lookupStepIndex = stepIndex;
    const stepIsCompleted = !run?.steps[stepIndex].isCompleted;

    if (!lookupTestName || !lookupRunDateTime) {
      return;
    }

    updateTestRunStepIsCompleted(
      lookupTestName,
      lookupRunDateTime,
      lookupStepIndex,
      stepIsCompleted,
    );
  };

  const steps = run?.steps ?? [];

  const completed = Object.fromEntries(
    steps.map((step, stepIndex) => [stepIndex, step.isCompleted]) ?? [],
  );

  return {
    steps,
    completed,

    handleClickStepCompleted,
  };
}
