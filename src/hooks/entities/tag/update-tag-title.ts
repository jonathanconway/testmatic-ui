import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type UpdateTagTitleFn = (
  lookupTagName: string,
  newTagTitle: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
