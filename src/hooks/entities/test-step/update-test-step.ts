import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type UpdateTestStepFn = (
  lookupTestName: string,
  lookupStepIndex: number,
  newTestStepText: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
