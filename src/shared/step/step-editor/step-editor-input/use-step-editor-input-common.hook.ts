import { useEffect, useRef, useState } from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../../hooks";
import "../../../utils";
import { Maybe } from "../../../utils";

import { StepEditorInputSelectionInfo } from "./step-editor-input-selection";
import {
  UseStepEditorInputParams,
  UseStepEditorInputRecentEvent,
} from "./use-step-editor-input.types";

interface UseStepEditorInputState {
  readonly input: {
    readonly value: string;
    readonly selectionInfo?: StepEditorInputSelectionInfo;
  };
  readonly suggest: {
    readonly isOpen: boolean;
    readonly filterText: string;
    readonly highlightedSuggestion?: Tag;
    readonly suggestions: readonly Tag[];
  };
}

export function useStepEditorInputCommon(params: UseStepEditorInputParams) {
  const { project } = useProject();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const inputLastEvent = useRef<Maybe<UseStepEditorInputRecentEvent>>();

  const [state, setState] = useState<UseStepEditorInputState>({
    input: {
      value: params.step.text,
    },
    suggest: {
      isOpen: false,
      filterText: "",
      suggestions: project.tags,
    },
  });

  useEffect(() => {
    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        value: params.step.text,
        selectionInfo: undefined,
      },
    }));
  }, [params.step]);

  const setSuggestIsOpen = (isOpen: boolean) => {
    setState((previousState) => ({
      ...previousState,
      suggest: {
        ...previousState.suggest,
        isOpen,
        suggestions: project.tags,
      },
    }));
  };

  return {
    params,
    state,
    setState,
    setSuggestIsOpen,
    inputLastEvent,
    textAreaRef,
  };
}
