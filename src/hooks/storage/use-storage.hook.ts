import { isSurge } from "../../env";
import { AddNewTestRunFn, DeleteTestRunFn, GetProjectFn } from "../entities";
import {
  AddNewTagFn,
  AddNewTestFn,
  AddNewTestStepFn,
  AddTagToTestFn,
  DeleteTagFn,
  DeleteTagFromTestFn,
  DeleteTestFn,
  DeleteTestStepFn,
  UpdateTagDescriptionFn,
  UpdateTestDescriptionFn,
  UpdateTestRunResultFn,
  UpdateTestRunStepIsCompletedFn,
  UpdateTestStepFn,
  UpdateTestTitleFn,
} from "../entities";

import * as httpClientStorageFns from "./storage-http-client";
import * as localStorageFns from "./storage-local";

interface UseStorageResult {
  // Project
  readonly getProject: GetProjectFn;

  // Project -> Test
  readonly addNewTest: AddNewTestFn;
  readonly deleteTest: DeleteTestFn;

  // Test
  readonly updateTestTitle: UpdateTestTitleFn;
  readonly updateTestDescription: UpdateTestDescriptionFn;

  // Test -> Step
  readonly addNewTestStep: AddNewTestStepFn;
  readonly updateTestStep: UpdateTestStepFn;
  readonly deleteTestStep: DeleteTestStepFn;

  // Project -> Tag
  readonly addNewTag: AddNewTagFn;
  readonly deleteTag: DeleteTagFn;

  // Tag
  readonly updateTagTitle: UpdateTagDescriptionFn;
  readonly updateTagDescription: UpdateTagDescriptionFn;

  // Test -> Tag
  readonly addTagToTest: AddTagToTestFn;
  readonly deleteTagFromTest: DeleteTagFromTestFn;

  // Test -> Run
  readonly addNewTestRun: AddNewTestRunFn;
  readonly deleteTestRun: DeleteTestRunFn;
  readonly updateTestRunStepIsCompleted: UpdateTestRunStepIsCompletedFn;
  readonly updateTestRunResult: UpdateTestRunResultFn;
}

export function useStorage(): UseStorageResult {
  return isSurge ? localStorageFns : httpClientStorageFns;
}
