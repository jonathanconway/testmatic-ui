import { isSurge } from "../../env";
import { GetProjectFn } from "../project";
import { AddNewTagFn, DeleteTagFn, UpdateTagDescriptionFn } from "../tag";
import {
  AddNewTestFn,
  AddTagToTestFn,
  DeleteTagFromTestFn,
  DeleteTestFn,
  UpdateTestDescriptionFn,
  UpdateTestTitleFn,
} from "../test";
import {
  UpdateTestRunResultFn,
  UpdateTestRunStepIsCompletedFn,
} from "../test-run";
import {
  AddNewTestStepFn,
  DeleteTestStepFn,
  UpdateTestStepFn,
} from "../test-step";

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
  readonly updateTestRunStepIsCompleted: UpdateTestRunStepIsCompletedFn;
  readonly updateTestRunResult: UpdateTestRunResultFn;
}

export function useStorage(): UseStorageResult {
  return isSurge ? localStorageFns : httpClientStorageFns;
}
