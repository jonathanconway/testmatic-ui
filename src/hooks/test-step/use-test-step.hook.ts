import { useParams } from "react-router-dom";

import { TestEditorRouteParams, useProject } from "../../shared";
import { getStorageFns } from "../storage";

export function useTestStep() {
  const { testName = "" } = useParams<TestEditorRouteParams>();

  const { project } = useProject();

  const test = testName ? project.testsByName[testName] : undefined;

  const storageFns = getStorageFns();

  const updateStep = (lookupStepIndex: number, newStepText: string) =>
    storageFns.updateTestStep(testName, lookupStepIndex, newStepText);

  const deleteStep = (lookupStepIndex: number) =>
    storageFns.deleteTestStep(testName, lookupStepIndex);

  return {
    test,

    updateStep,
    deleteStep,
  };
}
