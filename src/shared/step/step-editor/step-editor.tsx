import { HTMLProps, MouseEventHandler } from "react";
import { Step } from "testmatic";

import { Box } from "../../box";
import { IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Tooltip } from "../../tooltip";
import "../../utils";

import { StepEditorInput } from "./step-editor-input";
import * as Styled from "./step-editor.styles";
import { useStepEditor } from "./use-step-editor.hook";

interface StepEditorProps extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly stepIndex: number;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: MouseEventHandler;
}

export const StepEditorIds = {
  DeleteButton: "step-editor-delete-button",
};

export function StepEditor(props: StepEditorProps) {
  const { stepIndex, onDeleteClick, ...restProps } = props;

  const { containerRef, isEditing, handleStepInputFocus, handleStepInputBlur } =
    useStepEditor(props);

  return (
    <Styled.Container ref={containerRef}>
      <Styled.MainContainer>
        <Styled.StepEditorDisplay step={props.step} isVisible={!isEditing} />

        <StepEditorInput
          {...restProps}
          isVisible={isEditing}
          onFocus={handleStepInputFocus}
          onBlur={handleStepInputBlur}
        />
      </Styled.MainContainer>

      <Box width="1rem">
        <Tooltip contents="Delete step">
          <IconButton
            id={`${StepEditorIds.DeleteButton}-${props.stepIndex}`}
            icon={IconNames.Delete}
            size="small"
            onClick={props.onDeleteClick}
          />
        </Tooltip>
      </Box>
    </Styled.Container>
  );
}
