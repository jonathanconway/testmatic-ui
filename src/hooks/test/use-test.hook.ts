import { useParams } from "react-router-dom";

import { TestEditorRouteParams, useProject } from "../../shared";
import { getStorageFns } from "../storage";

export function useTest() {
  const { testName = "" } = useParams<TestEditorRouteParams>();

  const { project } = useProject();

  const test = testName ? project.testsByName[testName] : undefined;

  const storageFns = getStorageFns();

  const updateTitle = (newTitle: string) =>
    storageFns.updateTestTitle(testName, newTitle);

  const updateDescription = (newDescription: string) =>
    storageFns.updateTestDescription(testName, newDescription);

  return {
    test,

    updateTitle,
    updateDescription,
  };
}
