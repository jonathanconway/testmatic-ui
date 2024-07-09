export type ResultType = "ok" | "error";

export interface Result<TResultType extends ResultType> {
  readonly type: TResultType;
}

export interface ResultOk extends Result<"ok"> {
  readonly type: "ok";
}

export function resultOk(): ResultOk {
  return { type: "ok" };
}
export interface ResultOkWithData<TData extends object = object>
  extends Result<"ok"> {
  readonly type: "ok";
  readonly data: TData;
}

export function resultOkWithData<T extends object = object>(
  data: T,
): ResultOkWithData<T> {
  return { type: "ok", data };
}

export interface ResultError<TError extends object = object>
  extends Result<"error"> {
  readonly type: "error";
  readonly error?: TError;
}

export function resultError<TError extends object = object>(
  error?: TError,
): ResultError<TError> {
  return {
    type: "error",
    error,
  };
}
