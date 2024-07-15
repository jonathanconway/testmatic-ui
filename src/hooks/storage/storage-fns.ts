import { isSurge } from "../../env";
import { GetProjectFn } from "../project";
import { AddNewTagFn, DeleteTagFn, UpdateTagDescriptionFn } from "../tag";
import {
  AddNewTestFn,
  DeleteTestFn,
  UpdateTestDescriptionFn,
  UpdateTestTitleFn,
} from "../test";
import { UpdateTestRunResultFn, UpdateTestRunStepStatusFn } from "../test-run";
import {
  AddNewTestStepFn,
  DeleteTestStepFn,
  UpdateTestStepFn,
} from "../test-step";

import * as httpClientStorageFns from "./storage-http-client";
import * as localStorageFns from "./storage-local";

export interface StorageFns {
  readonly getProject: GetProjectFn;

  readonly addNewTest: AddNewTestFn;
  readonly deletetest: DeleteTestFn;
  readonly updateTestTitle: UpdateTestTitleFn;
  readonly updateTestDescription: UpdateTestDescriptionFn;

  readonly addNewTestStep: AddNewTestStepFn;
  readonly updateTestStep: UpdateTestStepFn;
  readonly deleteTestStep: DeleteTestStepFn;

  readonly updateTagDescriptionFn: UpdateTagDescriptionFn;

  readonly updateTestRunStep: UpdateTestRunStepStatusFn;
  readonly updateTestRunResult: UpdateTestRunResultFn;

  readonly addNewTag: AddNewTagFn;
  readonly deleteTag: DeleteTagFn;
}

export function getStorageFns() {
  return isSurge ? localStorageFns : httpClientStorageFns;
}
