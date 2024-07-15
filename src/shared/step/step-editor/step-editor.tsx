import {
  ForwardedRef,
  HTMLProps,
  KeyboardEvent,
  MouseEventHandler,
  SyntheticEvent,
  forwardRef,
  useRef,
  useState,
} from "react";
import { Step } from "testmatic";

import { Box } from "../../box";
import { IconButton } from "../../icon-button";
import { Tooltip } from "../../tooltip";
import "../../utils";
import { timeout } from "../../utils";

import { focusStepEditorDisplayLastLink } from "./step-editor-display";
import { StepEditorInput } from "./step-editor-input";
import * as Styled from "./step-editor.styles";

export interface StepEditorProps
  extends Omit<HTMLProps<HTMLDivElement>, "onChange" | "step"> {
  readonly step: Step;

  readonly onChange: (
    step: Step,
    event: SyntheticEvent<HTMLTextAreaElement>,
  ) => void | Promise<void>;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: MouseEventHandler;
}

interface StepEditorState {
  readonly isEditing: boolean;
}

export const StepEditor = forwardRef(
  (props: StepEditorProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const {
      step,

      onChange,
      onGoPrevious,
      onGoNext,
      onDeleteClick,

      ...restProps
    } = props;

    const [state, setState] = useState<StepEditorState>({ isEditing: false });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleStepInputKeyDown = async (
      event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      if (event.key === "Tab" && event.shiftKey) {
        // Wait for props.onCancel() handler to have run
        await timeout();

        focusStepEditorDisplayLastLink(containerRef.current);
      }
    };

    const handleStepInputFocus = () => {
      setState({ isEditing: true });
    };

    const handleStepInputBlur = () => {
      setState({ isEditing: false });
    };

    return (
      <Styled.Container {...restProps} ref={containerRef}>
        <Styled.MainContainer>
          <Styled.StepEditorDisplay
            step={props.step}
            isVisible={!state.isEditing}
          />

          <StepEditorInput
            ref={ref}
            step={props.step}
            isVisible={state.isEditing}
            onKeyDown={handleStepInputKeyDown}
            onFocus={handleStepInputFocus}
            onBlur={handleStepInputBlur}
            onChange={props.onChange}
            onGoPrevious={props.onGoPrevious}
            onGoNext={props.onGoNext}
          />
        </Styled.MainContainer>

        <Box width="1rem">
          <Tooltip contents="Delete step">
            <IconButton
              icon="delete"
              size="small"
              onClick={props.onDeleteClick}
            />
          </Tooltip>
        </Box>
      </Styled.Container>
    );
  },
);
