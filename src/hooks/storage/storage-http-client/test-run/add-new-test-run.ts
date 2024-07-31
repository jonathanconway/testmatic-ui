import { Run } from "testmatic";

import { AddNewTestRunFn } from "../../../entities";
import { responseToResult } from "../../../response";

import { testRunPost } from "./test-run-post.http";

export const addNewTestRun: AddNewTestRunFn = async (
  lookupTestName: string,
  newRun: Run,
) => {
  return responseToResult(await testRunPost(lookupTestName, newRun));
};
