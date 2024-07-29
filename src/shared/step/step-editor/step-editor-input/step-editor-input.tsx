import {
  FocusEvent,
  FormEvent,
  HTMLProps,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Step, Tag } from "testmatic";

import { Popup } from "../../../popup";
import { ExpandingTextBox } from "../../../text-box";
import "../../../utils";
import { timeout } from "../../../utils";

import { useTagSuggestController } from "./step-editor-input-tag-suggest";
import { TagSuggest } from "./step-editor-input-tag-suggest/tag-suggest";
import * as Styled from "./step-editor-input.styles";

interface StepEditorInputProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, "step"> {
  readonly step: Step;
  readonly isVisible: boolean;
  readonly isAdding?: boolean;

  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
}

export interface StepEditorInputState {
  readonly showTagSuggest: boolean;
  readonly value: string;
  readonly selectedTag?: Tag; // todo: rename to tagSuggestHighlightedTag or similar
  readonly isDirty: boolean;
}

export const StepInputClassNames = {
  TextArea: "step-input-text-area",
} as const;

export function StepEditorInput(props: StepEditorInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState<StepEditorInputState>({
    showTagSuggest: false,
    value: props.step?.text ?? "",
    isDirty: false,
  });

  useEffect(() => {
    setState({
      ...state,
      value: props.step?.text ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    tagSuggestController.input.handleKeyDown(event);

    switch (event.key) {
      case "Enter":
        handleKeyDownEnter(event);
        break;
      case "Tab":
        handleKeyDownTab(event);
        break;
      case "Escape":
        handleKeyDownEscape(event);
        break;
      case "ArrowUp":
        handleKeyDownArrowUp(event);
        break;
      case "ArrowDown":
        handleKeyDownArrowDown(event);
        break;
    }

    if (!tagSuggestController.tagSuggest.isOpen) {
      props.onKeyDown?.(event);
    }
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    props.onGoNext();
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      event.preventDefault();
      return;
    }
  };

  const handleKeyDownEscape = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    setState({
      isDirty: false,
      value: props.step?.text,
      showTagSuggest: false,
    });

    await timeout();

    textAreaRef?.current?.blur();
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    props.onGoPrevious();
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    props.onGoNext();
  };

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setState({
      ...state,
      value,
      selectedTag: undefined,
      isDirty: true,
    });

    tagSuggestController.input.handleInput(event);

    props.onInput?.(event);
  };

  const handleInputChange = (newValue: string) => {
    setState((previousState) => ({
      ...previousState,
      value: newValue,
    }));
  };

  const tagSuggestController = useTagSuggestController({
    input: {
      value: state.value,
      onChange: handleInputChange,
      ref: textAreaRef,
    },
  });

  const handleSelect = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    tagSuggestController.input.handleSelect(event);
  };

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      tagSuggestController.input.handleBlur();

      const didUserSelectFromTagSuggest =
        tagSuggestController.tagSuggest.isOpen;
      if (didUserSelectFromTagSuggest) {
        return;
      }

      props.onBlur?.(event);
    },
    [tagSuggestController.input, tagSuggestController.tagSuggest.isOpen, props],
  );

  const selectionMeasurerAnchorRef = useRef<HTMLSpanElement>(null);

  const { step, isVisible, isAdding, onGoPrevious, onGoNext, ...restProps } =
    props;

  return (
    <Styled.Container $isVisible={props.isVisible}>
      <ExpandingTextBox
        {...restProps}
        ref={textAreaRef}
        className={StepInputClassNames.TextArea}
        value={state.value}
        placeholder={props.placeholder}
        hoverBorder
        rows={1}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onBlur={handleBlur}
      />

      <Styled.SelectionMeasurer>
        {tagSuggestController.tagSuggest.selectionMeasurerValue}
        <Styled.SelectionMeasurerAnchor ref={selectionMeasurerAnchorRef} />
      </Styled.SelectionMeasurer>

      <Popup
        anchorElement={selectionMeasurerAnchorRef.current}
        isOpen={tagSuggestController.tagSuggest.isOpen}
      >
        <TagSuggest
          selectedTag={tagSuggestController.tagSuggest.highlightedTag}
          filterText={tagSuggestController.tagSuggest.filterText}
          onClose={tagSuggestController.tagSuggest.handleClose}
          onSelectTag={tagSuggestController.tagSuggest.handleSelectTag}
        />
      </Popup>
    </Styled.Container>
  );
}
