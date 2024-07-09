import { isSurge } from "../../env";
import { GetProjectFn } from "../project";
import { UpdateTagDescriptionFn } from "../tag";
import {
  AddNewTestFn,
  DeleteTestFn,
  UpdateTestDescriptionFn,
  UpdateTestTitleFn,
} from "../test";
import { DeleteTestStepFn } from "../test-step";
import { UpdateTestStepFn } from "../test-step/update-test-step";

import * as httpClientStorageFns from "./storage-http-client";
import * as localStorageFns from "./storage-local";

export interface StorageFns {
  readonly getProject: GetProjectFn;
  readonly addNewTest: AddNewTestFn;
  readonly deletetest: DeleteTestFn;
  readonly updateTestTitle: UpdateTestTitleFn;
  readonly updateTestDescription: UpdateTestDescriptionFn;

  readonly updateTestStep: UpdateTestStepFn;
  readonly deleteTestStep: DeleteTestStepFn;

  readonly updateTagDescriptionFn: UpdateTagDescriptionFn;
}

export function getStorageFns() {
  return isSurge ? localStorageFns : httpClientStorageFns;
}
