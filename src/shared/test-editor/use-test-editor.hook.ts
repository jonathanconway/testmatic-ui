import { isError, snakeCase } from "lodash";
import { useNavigate } from "react-router-dom";
import { Test, parseTags, projectAddTest, projectUpdateTest } from "testmatic";

import { getStorageFns } from "../../hooks";
import { homeRoute } from "../../screens";
import { showErrorNotification } from "../notification";
import { useProject } from "../project";

import { testEditorRoute } from "./test-editor.routes";
import { useEditingTest } from "./use-editing-test.hook";

export function useTestEditor() {
  const { editingTest, test, testName, isNewTest, isDirty, setEditingTest } =
    useEditingTest();

  const { project, saveProject } = useProject();

  const isSaveButtonDisabled = !isDirty;

  const navigateTo = useNavigate();

  const storageFns = getStorageFns();

  const handleClickSave = () => {
    if (isNewTest) {
      saveNewTest();
    } else {
      saveTest();
    }
  };

  const saveNewTest = async () => {
    const newTest = editingTest;

    if (!newTest || !project) {
      return;
    }

    const updatedProject = projectAddTest({ project, newTest });

    if (isError(updatedProject)) {
      showErrorNotification(updatedProject);
      return;
    }

    saveProject(updatedProject);

    setEditingTest(undefined);

    setTimeout(() => {
      navigateTo(testEditorRoute(newTest.name));
    });
  };

  const saveTest = async () => {
    if (!project || !editingTest || !testName) {
      return;
    }

    const updatedProject = projectUpdateTest({
      project,
      testName,
      updatedTest: editingTest,
    });
    console.log("saveTest", {
      project,
      editingTest,
      testName,
      updatedProject,
    });

    saveProject(updatedProject);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!test) {
      return;
    }

    const title = event.target.value;

    const updateTestTitleResult = storageFns.updateTestTitle(test.name, title);

    if (isError(updateTestTitleResult)) {
      showErrorNotification(updateTestTitleResult);
      return;
    }
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!test) {
      return;
    }

    const title = event.target.value;

    const updateTestDescriptionResult = storageFns.updateTestDescription(
      test.name,
      title,
    );

    if (isError(updateTestDescriptionResult)) {
      showErrorNotification(updateTestDescriptionResult);
      return;
    }
  };

  const handleChangeTest = (updatedTest: Test) => {
    // setEditingTest(updatedTest);

    const updatedTestWithParsedTags = {
      ...updatedTest,
      steps: updatedTest.steps.map((step) => ({
        ...step,
        tags: parseTags(step.text),
      })),
    };

    setEditingTest(updatedTestWithParsedTags);
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    test,
    isNewTest,
    isSaveButtonDisabled,
    handleClickSave,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeTest,
    handleCloseClick,
  };
}
