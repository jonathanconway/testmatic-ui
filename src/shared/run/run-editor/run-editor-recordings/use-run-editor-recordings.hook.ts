import { useQuery } from "@tanstack/react-query";

import { TestRunRecordingsParams, testRunRecordings } from "../../../client";
import { useEditingRun } from "../use-editing-run.hook";

export function useRunEditorRecordings() {
  const { test, run } = useEditingRun();

  const testName = test?.name;
  const runDateTime = run?.dateTime;

  const { data: runRecordings = [] } = useQuery({
    queryKey: ["run-recordings", { testName, runDateTime }],
    queryFn: ({ queryKey: [, params] }) =>
      testRunRecordings(params as TestRunRecordingsParams),
  });

  return {
    runRecordings,
  };
}
