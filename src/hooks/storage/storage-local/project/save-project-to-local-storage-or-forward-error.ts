import { isError } from "lodash";
import { ProjectView, ResultWithData, isResultError } from "testmatic";

import { saveProjectToLocalStorage } from "../../../../shared";
import { ResultError, ResultOk, resultError, resultOk } from "../../../result";

export async function saveProjectToLocalStorageOrForwardError<
  TError extends Error,
  T extends ProjectView | TError,
>(project: T, message?: string): Promise<ResultOk | ResultError<TError>> {
  if (isError(project)) {
    return resultError(project as TError) as ResultError<TError>;
  }

  saveProjectToLocalStorage(project);

  return resultOk(message);
}

export async function saveResultProjectToLocalStorageOrForwardError<
  TError extends Error,
>(
  result: ResultWithData<ProjectView>,
  message?: string,
): Promise<ResultOk | ResultError<TError>> {
  if (isResultError(result)) {
    return result as ResultError<TError>;
  }

  saveProjectToLocalStorage(result.data);

  return resultOk(message);
}
