import { SERVER_BASE_URL } from "../../../../shared/client/base";
import { HttpMethods } from "../http-method";

export function testTagPost(lookupTestName: string, lookupTagName: string) {
  return fetch(
    `${SERVER_BASE_URL}/tests/${lookupTestName}/tags/${lookupTagName}`,
    {
      method: HttpMethods.Delete,
    },
  );
}
