import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type DeleteTestFn = (
  lookupTestName: string,
) => ResultOk | ResultError<NotFoundError>;
