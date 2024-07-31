import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type DeleteTestRunFn = (
  lookupTestName: string,
  lookupRunDateTime: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
