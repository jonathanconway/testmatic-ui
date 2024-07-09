import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type DeleteTestStepFn = (
  lookupTestName: string,
  lookupStepIndex: number,
) => Promise<ResultOk | ResultError<NotFoundError>>;
