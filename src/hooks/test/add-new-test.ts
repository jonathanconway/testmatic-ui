import { AlreadyExistsError, Test } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type AddNewTestFn = (
  newTest: Test,
) => Promise<ResultOk | ResultError<AlreadyExistsError>>;
