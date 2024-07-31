import { AlreadyExistsError, Run } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type AddNewTestRunFn = (
  lookupTestName: string,
  newRun: Run,
) => Promise<ResultOk | ResultError<AlreadyExistsError>>;
