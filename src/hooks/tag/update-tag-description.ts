import { NotFoundError } from "testmatic";

import { ResultError, ResultOk } from "../result";

export type UpdateTagDescriptionFn = (
  lookupTagName: string,
  newTagDescription: string,
) => Promise<ResultOk | ResultError<NotFoundError>>;
