import { RunResults } from "testmatic";

import { Heading } from "../../../heading";
import { Icon } from "../../../icon";
import { Stack } from "../../../layout";
import { ToggleButton, ToggleButtons } from "../../../toggle-buttons";
import { sentenceCase } from "../../../utils";

import { useRunEditorResult } from "./use-run-editor-result.hook";

export function RunEditorResult() {
  const runResults = [RunResults.Passed, RunResults.Failed, RunResults.Mixed];

  const { runResult: currentRunResult, handleRunResultClick } =
    useRunEditorResult();

  return (
    <Stack spacing={1}>
      <Heading level={3}>Result</Heading>

      <ToggleButtons>
        {runResults.map((runResult) => (
          <ToggleButton
            key={runResult}
            value={runResult}
            isSelected={currentRunResult === runResult}
            onClick={handleRunResultClick(runResult)}
          >
            <span>{sentenceCase(runResult)}</span>
            <Icon icon={runResult} />
          </ToggleButton>
        ))}
      </ToggleButtons>
    </Stack>
  );
}
