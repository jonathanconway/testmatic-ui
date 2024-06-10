import { runResultEmoji } from "./run-result-icon.utils";
import { RunResult } from "testmatic";

export interface RunResultProps {
  readonly runStatus: RunResult;
}

export function RunResultIcon(props: RunResultProps) {
  return <>{runResultEmoji(props.runStatus)}</>;
}
