import { Test } from "testmatic";

import { AddNewTestFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { testPost } from "./test-post.http";

export const addNewTest: AddNewTestFn = async (newTest: Test) => {
  const response = await testPost({
    ...newTest,
    stepTexts: newTest.steps.map((s) => s.text),
  });

  return responseToResult(response);
};
