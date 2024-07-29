import { SERVER_BASE_URL } from "../../../../shared/client/base";

export function testTagPost(
  lookupTestName: string,
  newOrLookupTagName: string,
) {
  return fetch(
    `${SERVER_BASE_URL}/tests/${lookupTestName}/tags/${newOrLookupTagName}`,
    {
      method: "POST",
    },
  );
}
