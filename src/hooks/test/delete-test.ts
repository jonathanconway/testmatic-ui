import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type DeleteTestFn = (
  lookupTestName: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
