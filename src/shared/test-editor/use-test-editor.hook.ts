import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useStorage } from "../../hooks";
import { homeRoute } from "../../screens";
import { showSuccessOrErrorNotification } from "../notification";

import { useEditingTest } from "./use-editing-test.hook";

export function useTestEditor() {
  const { test, isNewTest } = useEditingTest();

  // isCreateButtonDisabled,
  // isNewTest,
  // handleClickCreate,

  const navigateTo = useNavigate();

  const { updateTestDescription } = useStorage();

  // const saveNewTest = async () => {
  //   const newTest = editingTest;

  //   if (!newTest || !project) {
  //     return;
  //   }

  //   const updatedProject = projectAddTest({ project, newTest });

  //   if (isError(updatedProject)) {
  //     showErrorNotification(updatedProject);
  //     return;
  //   }

  //   const addNewTestResult = await addNewTest(newTest);

  //   showSuccessOrErrorNotification(addNewTestResult);

  //   if (isError(addNewTestResult)) {
  //     return;
  //   }

  //   setEditingTest(undefined);

  //   setTimeout(() => {
  //     navigateTo(testEditorRoute(newTest.name));
  //   });
  // };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const title = event.target.value;

    if (title === test.title) {
      return;
    }

    const updateTestDescriptionResult = updateTestDescription(test.name, title);

    showSuccessOrErrorNotification(updateTestDescriptionResult);
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    test,
    isNewTest,
    // isCreateButtonDisabled,
    // handleClickCreate,
    handleChangeDescription,
    handleCloseClick,
  };
}
