import { responseToResult } from "../../../response";
import { AddTagToTestFn } from "../../../test";

import { testTagPost } from "./test-tag-post.http";

export const addTagToTest: AddTagToTestFn = async (
  lookupTestName,
  newOrLookupTagName,
) => {
  const response = await testTagPost(lookupTestName, newOrLookupTagName);

  return responseToResult(response);
};
