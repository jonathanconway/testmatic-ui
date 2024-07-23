import {
  FormEventHandler,
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
import { IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Tooltip } from "../../tooltip";
import "../../utils";
import { timeout } from "../../utils";

import { focusStepEditorDisplayLastLink } from "./step-editor-display";
import { StepEditorInput } from "./step-editor-input";
import * as Styled from "./step-editor.styles";

// todo : clean this up somehow
export interface StepEditorProps
  extends Omit<HTMLProps<HTMLDivElement>, "onChange" | "step" | "onInput"> {
  readonly step: Step;
  readonly stepIndex: number;

  readonly onChange: (
    step: Step,
    event: SyntheticEvent<HTMLTextAreaElement>,
  ) => void | Promise<void>;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onDeleteClick: MouseEventHandler;

  readonly onInput?: FormEventHandler<HTMLTextAreaElement>;
}

interface StepEditorState {
  readonly isEditing: boolean;
}

export const StepEditorClassNames = {
  StepEditor: "step-editor",
  StepEditorDeleteButton: "step-editor-delete-button",
};

export const StepEditor = forwardRef(
  (props: StepEditorProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const deleteButtonRef = useRef<HTMLButtonElement>(null);

    const {
      step,
      stepIndex,

      onChange,
      onGoPrevious,
      onGoNext,
      onDeleteClick,
      onInput,

      ...restProps
    } = props;

    const [state, setState] = useState<StepEditorState>({ isEditing: false });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleStepInputKeyDown = async (
      event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      console.log("handleStepInputKeyDown");

      switch (event.key) {
        case "Tab":
          if (!event.shiftKey) {
            await timeout();

            const deleteButtonClassName = `.${StepEditorClassNames.StepEditorDeleteButton}-${props.stepIndex}`;

            const deleteButtonElement =
              window.document.querySelector<HTMLButtonElement>(
                deleteButtonClassName,
              );

            deleteButtonElement?.focus();
          }
          return;
      }
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
      console.log("handleStepInputBlur");
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
            onInput={props.onInput}
            placeholder={props.placeholder}
          />
        </Styled.MainContainer>

        <Box width="1rem">
          <Tooltip contents="Delete step">
            <IconButton
              className={`${StepEditorClassNames.StepEditorDeleteButton}-${props.stepIndex}`}
              ref={deleteButtonRef}
              icon={IconNames.Delete}
              size="small"
              onClick={props.onDeleteClick}
            />
          </Tooltip>
        </Box>
      </Styled.Container>
    );
  },
);
