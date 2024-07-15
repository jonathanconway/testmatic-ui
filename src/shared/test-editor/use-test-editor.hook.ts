import { isError } from "lodash";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { projectAddTest } from "testmatic";

import { getStorageFns } from "../../hooks";
import { homeRoute } from "../../screens";
import { showErrorNotification } from "../notification";
import { useProject } from "../project";

import { testEditorRoute } from "./test-editor.routes";
import { useEditingTest } from "./use-editing-test.hook";

export function useTestEditor() {
  const { editingTest, test, isNewTest, isDirty, setEditingTest } =
    useEditingTest();

  const { project, saveProject } = useProject();

  const isCreateButtonDisabled = !isDirty;

  const navigateTo = useNavigate();

  const storageFns = getStorageFns();

  const handleClickCreate = () => {
    if (isNewTest) {
      saveNewTest();
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

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!test) {
      return;
    }

    const title = event.target.value;

    if (title === test.title) {
      return;
    }

    const updateTestDescriptionResult = storageFns.updateTestDescription(
      test.name,
      title,
    );

    if (isError(updateTestDescriptionResult)) {
      showErrorNotification(updateTestDescriptionResult);
    }
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    test,
    isNewTest,
    isCreateButtonDisabled,
    handleClickCreate,
    handleChangeDescription,
    handleCloseClick,
  };
}
