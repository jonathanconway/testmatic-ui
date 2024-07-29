import { NotFoundError, RunResult } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type UpdateTestRunResultFn = (
  lookupTestName: string,
  lookupRunDateTime: string,
  updateRunResult: RunResult,
) => Promise<ResultOk | ResultError<NotFoundError>>;
