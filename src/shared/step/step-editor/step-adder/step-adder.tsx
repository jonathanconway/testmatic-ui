import { noop } from "lodash";
import { HTMLProps, KeyboardEvent } from "react";
import { Step } from "testmatic";

import { Box } from "../../../box";
import { timeout } from "../../../utils";
import { StepEditorIds } from "../step-editor";
import { StepEditorInput } from "../step-editor-input";

import * as Styled from "./step-adder.styles";

export interface StepAdderProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly stepIndex: number;
  readonly onGoPrevious: VoidFunction;
}

export const StepAdderIds = {
  Input: "step-adder-input",
};

export function StepAdder(props: StepAdderProps) {
  const { step, stepIndex, ref, onKeyDown, ...restProps } = props;

  const handleStepInputKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    console.log("step-adder handleStepInputKeyDown");
    switch (event.key) {
      case "ArrowUp":
        handleKeyDownArrowUp();
        break;

      case "Tab":
        if (!event.shiftKey) {
          await timeout();

          const deleteButtonClassName = `${StepEditorIds.DeleteButton}-${props.stepIndex}`;

          const deleteButtonElement = window.document.getElementById(
            deleteButtonClassName,
          );

          deleteButtonElement?.focus();
        }
        return;
    }
  };

  const handleKeyDownArrowUp = () => {
    props.onGoPrevious();
  };

  return (
    <Styled.Container>
      <Styled.MainContainer>
        <StepEditorInput
          {...restProps}
          step={props.step}
          isVisible
          onKeyDown={handleStepInputKeyDown}
          // onFocus={noop}
          // onBlur={noop}
          onGoNext={noop}
          placeholder="Add new step"
        />
      </Styled.MainContainer>

      <Box width="1rem"></Box>
    </Styled.Container>
  );
}
