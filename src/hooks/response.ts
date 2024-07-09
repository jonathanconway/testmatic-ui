import { resultError, resultOk } from "./result";

export async function responseToResult(response: Response) {
  if (response.ok) {
    return resultOk();
  } else {
    return resultError(await response.json());
  }
}
