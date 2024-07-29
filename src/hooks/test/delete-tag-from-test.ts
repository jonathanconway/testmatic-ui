import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type DeleteTagFromTestFn = (
  lookupTestName: string,
  lookupTagName: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
