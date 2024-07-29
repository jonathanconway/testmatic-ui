import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type AddNewTestStepFn = (
  lookupTestName: string,
  newTestStepText: string,
  lookupBeforeStepIndex?: number,
) => Promise<ResultOk | ResultError<NotFoundError>>;
