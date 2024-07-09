import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type UpdateTestTitleFn = (
  lookupTestName: string,
  newTitle: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
