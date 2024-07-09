import { RunResult, sentenceCase } from "testmatic";

import { Icon, IconNames } from "../../icon";
import { Tooltip } from "../../tooltip";

export interface RunResultProps {
  readonly runResult?: RunResult;
}

export function RunResultIcon(props: RunResultProps) {
  return (
    <Tooltip contents={sentenceCase(props.runResult ?? "not run")}>
      <Icon icon={props.runResult ?? IconNames.NotRun} cursor="default" />
    </Tooltip>
  );
}
