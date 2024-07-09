import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type UpdateTestDescriptionFn = (
  lookupTestName: string,
  newTestDescription: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
