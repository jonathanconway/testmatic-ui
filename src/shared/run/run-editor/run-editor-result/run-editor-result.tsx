import { RunResult, RunResults } from "testmatic";
import { Heading } from "../../../heading";
import { Stack } from "../../../layout";
import { ToggleButton, ToggleButtons } from "../../../toggle-buttons";
import { Icon, IconNames } from "../../../icon";

interface RunEditorResultProps {
  readonly runResult?: RunResult;
}

export function RunEditorResult(props: RunEditorResultProps) {
  return (
    <Stack spacing={1}>
      <Heading level={3}>Result</Heading>

      <ToggleButtons value={props.runResult}>
        <ToggleButton value={RunResults.Passed}>
          <Icon icon={IconNames.Passed} /> <span>Passed</span>
        </ToggleButton>
        <ToggleButton value={RunResults.Failed}>
          <Icon icon={IconNames.Failed} /> Failed
        </ToggleButton>
        <ToggleButton value={RunResults.Mixed}>
          <Icon icon={IconNames.Mixed} /> Mixed
        </ToggleButton>
      </ToggleButtons>
    </Stack>
  );
}
