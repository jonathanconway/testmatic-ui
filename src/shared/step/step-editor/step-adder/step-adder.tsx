import { HTMLProps, KeyboardEvent } from "react";
import { Step } from "testmatic";

import { KeyCodes } from "../../../../hooks";
import { Box } from "../../../box";
import { getLastElementByClassName, timeout } from "../../../utils";
import { StepEditorInput, StepInputClassNames } from "../step-editor-input";

import * as Styled from "./step-adder.styles";

export interface StepAdderProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly stepIndex: number;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
}

export function StepAdder(props: StepAdderProps) {
  const { step, stepIndex, ref, onKeyDown, ...restProps } = props;

  const handleStepInputKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    switch (event.key) {
      case KeyCodes.Enter:
        handleKeyDownEnter(event);
        break;

      case KeyCodes.Tab:
        handleKeyDownTab(event);
        break;
    }
  };

  const handleKeyDownTab = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownTabOrEnter = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.shiftKey) {
      return;
    }

    if ((event.target as HTMLTextAreaElement).value.trim() === "") {
      return;
    }

    // Wait for blur event to be processed, so current item can be saved.
    await timeout(200);

    // After save, focus the next step adder.
    getLastElementByClassName(StepInputClassNames.TextArea)?.focus();
  };

  return (
    <Styled.Container>
      <Styled.MainContainer>
        <StepEditorInput
          {...restProps}
          step={props.step}
          isVisible
          onKeyDown={handleStepInputKeyDown}
          placeholder="Add new step"
        />
      </Styled.MainContainer>

      {/*
        @tabIndex - Capture focus on tab out for a smooth transition, after save,
        to focus the next step adder.
      */}
      <Box width="1rem" tabIndex={0}></Box>
    </Styled.Container>
  );
}
