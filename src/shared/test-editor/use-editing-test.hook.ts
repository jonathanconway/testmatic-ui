import { orderBy } from "lodash";
import { useParams } from "react-router-dom";

import { useTest } from "../../hooks";

import { TestEditorRouteParams } from "./test-editor.routes";

export function useEditingTest() {
  const { testName = undefined } = useParams<TestEditorRouteParams>();

  const { test } = useTest(testName);

  const runs = orderBy(test?.runs, "dateTime", "desc");

  return {
    test,
    runs,
    testName,
  };
}
