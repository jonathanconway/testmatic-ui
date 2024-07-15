import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type DeleteTagFn = (
  lookupTagName: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
