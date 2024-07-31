import {
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { Step } from "testmatic";

import "../../../utils";

export interface UseStepEditorInputParams {
  readonly step: Step;

  readonly onKeyDown?: KeyboardEventHandler;
  readonly onInput?: FormEventHandler;
  readonly onBlur?: FocusEventHandler;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
}

export type UseStepEditorInputRecentEvent =
  | "input"
  | "select"
  | "select-suggestion";
