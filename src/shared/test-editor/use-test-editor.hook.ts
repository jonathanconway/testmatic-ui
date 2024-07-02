import { snakeCase } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  Test,
  isAlreadyExistsError,
  projectAddTest,
  projectUpdateTest,
} from "testmatic";

import { homeRoute } from "../../screens";
import { showNotification } from "../notification";
import { useProject } from "../project";

import { testEditorRoute } from "./test-editor.routes";
import { useEditingTest } from "./use-editing-test.hook";

export function useTestEditor() {
  const { editingTest, test, testName, isNewTest, isDirty, setEditingTest } =
    useEditingTest();

  const { project, saveProject } = useProject();

  const isSaveButtonDisabled = !isDirty;

  const navigateTo = useNavigate();

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

    if (isAlreadyExistsError(updatedProject)) {
      showNotification({
        message: updatedProject.message,
        type: "error",
      });
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

    saveProject(updatedProject);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!test) {
      return;
    }

    const title = event.target.value;

    setEditingTest({
      ...test, // todo: change to test-create-name-from-title
      title,
      name: snakeCase(title),
    });
  };

  const handleChangeTest = (updatedTest: Test) => {
    setEditingTest(updatedTest);
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
    handleChangeTest,
    handleCloseClick,
  };
}
