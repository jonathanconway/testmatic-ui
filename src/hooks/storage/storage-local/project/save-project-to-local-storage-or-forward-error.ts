import { isError } from "lodash";
import { ProjectView } from "testmatic";

import { saveProjectToLocalStorage } from "../../../../shared";
import { ResultError, ResultOk, resultError, resultOk } from "../../../result";

export function saveProjectToLocalStorageOrForwardError<
  TError extends Error,
  T extends ProjectView | TError,
>(project: T): ResultOk | ResultError<TError> {
  if (isError(project)) {
    return resultError(project as TError) as ResultError<TError>;
  }

  saveProjectToLocalStorage(project);
  return resultOk();
}
