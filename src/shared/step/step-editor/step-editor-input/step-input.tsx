import { ExpandingTextBox } from "../../../expanding-text-box";
import { Popover } from "../../../popover";
import "../../../utils";
import { TagSuggest } from "./step-editor-input-tag-suggest/tag-suggest";
import { useTagSuggestController } from "./step-editor-input-tag-suggest/use-tag-suggest-controller.hook";
import * as Styled from "./step-input.styles";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useRef,
  useState,
  LegacyRef,
  useEffect,
  KeyboardEventHandler,
  useCallback,
} from "react";
import { Step, Tag, createTestStepFromText } from "testmatic";

interface StepInputProps {
  readonly step: Step;
  readonly ref?: LegacyRef<HTMLTextAreaElement>;
  readonly isVisible: boolean;
  readonly isAdding?: boolean;

  readonly onKeyDown: KeyboardEventHandler;
  readonly onEdit: VoidFunction;
  readonly onChange: (step: Step) => void;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onCancel: VoidFunction;
}

export interface StepInputState {
  readonly showTagSuggest: boolean;
  readonly value: string;
  readonly selectedTag?: Tag; // todo: rename to tagSuggestHighlightedTag or similar
  readonly isDirty: boolean;
}

export const StepInputClassNames = {
  StepInputTextArea: "step-input-textarea",
} as const;

export function StepInput(props: StepInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [state, setState] = useState<StepInputState>({
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
  }, [props.step?.text]);

  useEffect(() => {
    if (props.isVisible) {
      textAreaRef.current?.focus();
    }
  }, [props.isVisible]);

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    handleKeyDownEnterOrTab();
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    if (state.isDirty) {
      event.preventDefault();
      handleKeyDownEnterOrTab();
    }
  };

  const handleKeyDownEnterOrTab = () => {
    triggerOnChange();

    props.onGoNext();
  };

  const handleKeyDownEscape = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    props.onCancel();
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    triggerOnChange();

    props.onGoPrevious();
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    triggerOnChange();

    props.onGoNext();
  };

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

    props.onKeyDown(event);
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    setState({
      ...state,
      value,
      selectedTag: undefined,
      isDirty: true,
    });

    tagSuggestController.input.handleInput(event);
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
    },
  });

  const handleSelect = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    tagSuggestController.input.handleSelect(event);
  };

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    props.onEdit();
  };

  const triggerOnChange = useCallback(() => {
    props.onChange(createTestStepFromText(state.value));
  }, [props, state.value]);

  const handleBlur = useCallback(() => {
    const didUserSelectFromTagSuggest = tagSuggestController.tagSuggest.isOpen;
    if (didUserSelectFromTagSuggest) {
      return;
    }

    if (state.isDirty) {
      props.onChange(createTestStepFromText(state.value));
    } else {
      props.onCancel();
    }
  }, [
    props,
    state.isDirty,
    state.value,
    tagSuggestController.tagSuggest.isOpen,
  ]);

  const selectionMeasurerAnchorRef = useRef<HTMLSpanElement>(null);

  return (
    <Styled.Container $isVisible={props.isVisible}>
      <ExpandingTextBox
        ref={textAreaRef}
        autoFocus={props.isVisible}
        className={StepInputClassNames.StepInputTextArea}
        value={state.value}
        placeholder={props.isAdding ? "Add new step" : undefined}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Styled.SelectionMeasurer>
        {tagSuggestController.tagSuggest.selectionMeasurerValue}
        <Styled.SelectionMeasurerAnchor ref={selectionMeasurerAnchorRef} />
      </Styled.SelectionMeasurer>

      <Popover
        anchorElement={selectionMeasurerAnchorRef.current}
        isOpen={tagSuggestController.tagSuggest.isOpen}
      >
        <TagSuggest
          selectedTag={tagSuggestController.tagSuggest.highlightedTag}
          filterText={tagSuggestController.tagSuggest.filterText}
          onClose={tagSuggestController.tagSuggest.handleClose}
          onSelectTag={tagSuggestController.tagSuggest.handleSelectTag}
        />
      </Popover>
    </Styled.Container>
  );
}
