import { AlreadyExistsError, Tag } from "testmatic";

import { ResultError, ResultOk } from "../../result";

export type AddNewTagFn = (
  newTag: Tag,
) => Promise<ResultOk | ResultError<AlreadyExistsError>>;
