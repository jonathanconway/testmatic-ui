import { useProject } from "../../hooks";
import { useStorage } from "../storage";

export function useTest(testName = "") {
  const { project } = useProject();

  const test = project.testsByName[testName];

  // const test = (() => {
  //   if (testName === TEST_NEW_NAME) {
  //     return TEST_NEW;
  //   }
  //   return project.testsByName[testName];
  // })();

  const { updateTestTitle, updateTestDescription } = useStorage();

  // todo: do i really have to type newTitle again? why can't typescript do inference here?
  const updateTitle = (newTitle: string) => updateTestTitle(testName, newTitle);

  const updateDescription = (newDescription: string) =>
    updateTestDescription(testName, newDescription);

  return {
    test,

    updateTitle,
    updateDescription,
  };
}
