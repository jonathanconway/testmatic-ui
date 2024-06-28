import { IconButton } from "../../icon-button";
import { Tooltip } from "../../tooltip";
import "../../utils";
import { timeout } from "../../utils";
import {
  StepEditorDisplay,
  focusStepEditorDisplayLastLink,
} from "./step-editor-display";
import { StepEditorInput } from "./step-editor-input";
import * as Styled from "./step-editor.styles";
import { HTMLProps, KeyboardEvent, useRef } from "react";
import { Step } from "testmatic";

export interface StepEditorProps
  extends Omit<HTMLProps<HTMLDivElement>, "onChange" | "step"> {
  readonly step: Step;
  readonly isEditing: boolean;

  readonly onClick: VoidFunction;
  readonly onChange: (step: Step) => void;
  readonly onCancel: VoidFunction;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: VoidFunction;
}

export const StepEditor = function (props: StepEditorProps) {
  const {
    step,
    isEditing,

    onClick,
    onChange,
    onCancel,
    onGoPrevious,
    onGoNext,
    onDeleteClick,

    ...restProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const handleStepInputKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab" && event.shiftKey) {
      props.onCancel();

      // Wait for props.onCancel() handler to have run
      await timeout();

      focusStepEditorDisplayLastLink(containerRef.current);
    }
  };

  return (
    <Styled.Container {...restProps} ref={containerRef}>
      <Styled.MainContainer>
        {!props.isEditing && (
          <StepEditorDisplay step={props.step} onClick={props.onClick} />
        )}

        <StepEditorInput
          step={props.step}
          isVisible={props.isEditing}
          onKeyDown={handleStepInputKeyDown}
          onEdit={props.onClick}
          onChange={props.onChange}
          onCancel={props.onCancel}
          onGoPrevious={props.onGoPrevious}
          onGoNext={props.onGoNext}
        />
      </Styled.MainContainer>
      <Styled.ActionsContainer>
        <Tooltip contents="Delete step">
          <IconButton
            icon="delete"
            size="small"
            onClick={props.onDeleteClick}
          />
        </Tooltip>
      </Styled.ActionsContainer>
    </Styled.Container>
  );
};
