import { HTMLProps } from "react";
import { Step } from "testmatic";

import { IconNames } from "../../../icon";
import { Menu, MenuItem } from "../../../menu";
import { Popup } from "../../../popup";
import { ExpandingTextBox } from "../../../text-box";
import "../../../utils";

import * as Styled from "./step-editor-input.styles";
import { useStepEditorInput } from "./use-step-editor-input.hook";

interface StepEditorInputProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly isVisible: boolean;
  readonly isAdding?: boolean;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
}

export const StepInputClassNames = {
  TextArea: "step-input-text-area",
} as const;

export function StepEditorInput(props: StepEditorInputProps) {
  const { input, measurer, suggest } = useStepEditorInput(props);

  const { step, isVisible, isAdding, onGoPrevious, onGoNext, ...restProps } =
    props;

  return (
    <Styled.Container $isVisible={props.isVisible}>
      <ExpandingTextBox
        {...restProps}
        ref={input.ref}
        className={StepInputClassNames.TextArea}
        value={input.value}
        placeholder={props.placeholder}
        hoverBorder
        rows={1}
        onInput={input.handleInput}
        onKeyDown={input.handleKeyDown}
        onSelect={input.handleSelect}
        onBlur={input.handleBlur}
      />

      <Styled.SelectionMeasurer>
        {measurer.value}
        <Styled.SelectionMeasurerAnchor ref={measurer.ref} />
      </Styled.SelectionMeasurer>

      <Popup
        anchorElement={measurer.ref.current}
        isOpen={suggest.isOpen}
        onClose={suggest.handleClose}
      >
        <Menu>
          {suggest.suggestions.map((suggestion) => (
            <MenuItem
              key={suggestion.name}
              title={suggestion.title}
              icon={IconNames.Tag}
              isHighlighted={suggestion.name === suggest.highlightedTag?.name}
              onClick={() => suggest.handleSelect(suggestion)}
            />
          ))}
        </Menu>
      </Popup>
    </Styled.Container>
  );
}
