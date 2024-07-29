import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type AddTagToTestFn = (
  lookupTestName: string,
  newOrLookupTagName: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
