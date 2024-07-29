import {
  FocusEvent,
  HTMLProps,
  KeyboardEvent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { Step } from "testmatic";

import { Box } from "../../box";
import { IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Tooltip } from "../../tooltip";
import "../../utils";
import { timeout } from "../../utils";

import { focusStepEditorDisplayLastLink } from "./step-editor-display";
import { StepEditorInput } from "./step-editor-input";
import * as Styled from "./step-editor.styles";

export interface StepEditorProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly stepIndex: number;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: MouseEventHandler;
}

interface StepEditorState {
  readonly isEditing: boolean;
}

export const StepEditorIds = {
  DeleteButton: "step-editor-delete-button",
};

export function StepEditor(props: StepEditorProps) {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const {
    step,
    stepIndex,

    onBlur,
    onFocus,
    onDeleteClick,

    ...restProps
  } = props;

  const [state, setState] = useState<StepEditorState>({ isEditing: false });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleStepInputKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    switch (event.key) {
      case "Tab":
        handleStepInputKeyDownTab(event);
    }
  };

  const handleStepInputKeyDownTab = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.shiftKey) {
      // Wait for props.onCancel() handler to have run
      await timeout();

      focusStepEditorDisplayLastLink(containerRef.current);
    } else {
      await timeout();

      const deleteButtonClassName = `${StepEditorIds.DeleteButton}-${props.stepIndex}`;

      const deleteButtonElement = window.document.getElementById(
        deleteButtonClassName,
      );

      deleteButtonElement?.focus();
    }
  };

  const handleStepInputFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setState({ isEditing: true });

    props.onFocus?.(event);
  };

  const handleStepInputBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setState({ isEditing: false });

    props.onBlur?.(event);
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.MainContainer>
        <Styled.StepEditorDisplay
          step={props.step}
          isVisible={!state.isEditing}
        />

        <StepEditorInput
          step={props.step}
          isVisible={state.isEditing}
          {...restProps}
          onKeyDown={handleStepInputKeyDown}
          onFocus={handleStepInputFocus}
          onBlur={handleStepInputBlur}
        />
      </Styled.MainContainer>
      <Box width="1rem">
        <Tooltip contents="Delete step">
          <IconButton
            id={`${StepEditorIds.DeleteButton}-${props.stepIndex}`}
            ref={deleteButtonRef}
            icon={IconNames.Delete}
            size="small"
            onClick={props.onDeleteClick}
          />
        </Tooltip>
      </Box>
    </Styled.Container>
  );
}
