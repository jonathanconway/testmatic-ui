import { Test } from "testmatic";

import { resultError, resultOk } from "../../../result";
import { AddNewTestFn } from "../../../test";

import { testPost } from "./test-post.http";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const response = await testPost({
    ...newTest,
    stepTexts: newTest.steps.map((s) => s.text),
  });

  if (response.ok) {
    return resultOk();
  } else {
    return resultError(await response.json());
  }
};
