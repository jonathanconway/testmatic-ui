import { useParams } from "react-router-dom";

import { TestEditorRouteParams } from "../../../shared";
import { useStorage } from "../../storage";
import { useProject } from "../project";

export function useTestStep() {
  const { testName = "" } = useParams<TestEditorRouteParams>();

  const { project } = useProject();

  const test = testName ? project.testsByName[testName] : undefined;

  const { addNewTestStep, updateTestStep, deleteTestStep } = useStorage();

  const addNewStep = (newStepText: string) =>
    addNewTestStep(testName, newStepText);

  const updateStep = (lookupStepIndex: number, newStepText: string) =>
    updateTestStep(testName, lookupStepIndex, newStepText);

  const deleteStep = (lookupStepIndex: number) =>
    deleteTestStep(testName, lookupStepIndex);

  return {
    test,

    addNewStep,
    updateStep,
    deleteStep,
  };
}
