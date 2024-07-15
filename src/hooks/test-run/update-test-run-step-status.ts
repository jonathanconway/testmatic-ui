import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type UpdateTestRunStepStatusFn = (
  lookupTestName: string,
  lookupRunDateTime: string,
  lookupRunStepIndex: number,
  stepIsCompleted: boolean,
) => Promise<ResultOk | ResultError<NotFoundError>>;
