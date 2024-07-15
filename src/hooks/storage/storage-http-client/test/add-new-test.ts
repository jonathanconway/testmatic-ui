import { Test } from "testmatic";

import { responseToResult } from "../../../response";
import { AddNewTestFn } from "../../../test";

import { testPost } from "./test-post.http";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const response = await testPost({
    ...newTest,
    stepTexts: newTest.steps.map((s) => s.text),
  });

  return responseToResult(response);
};
