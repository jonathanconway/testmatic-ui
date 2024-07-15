import {
  FocusEvent,
  FormEvent,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  LegacyRef,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Step, Tag, createTestStepFromText } from "testmatic";

import { Popover } from "../../../popover";
import { ExpandingTextBox } from "../../../text-box";
import "../../../utils";

import { useTagSuggestController } from "./step-editor-input-tag-suggest";
import { TagSuggest } from "./step-editor-input-tag-suggest/tag-suggest";
import * as Styled from "./step-editor-input.styles";

// todo: fix to inherit events from text area dom element type
interface StepEditorInputProps {
  readonly step: Step;
  readonly ref?: LegacyRef<HTMLTextAreaElement>;
  readonly isVisible: boolean;
  readonly isAdding?: boolean;

  readonly onKeyDown: KeyboardEventHandler;
  readonly onFocus?: VoidFunction;
  readonly onChange: (
    step: Step,
    event: SyntheticEvent<HTMLTextAreaElement>,
  ) => void | Promise<void>;
  readonly onBlur: VoidFunction;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
  readonly onInput?: FormEventHandler<HTMLTextAreaElement>;
}

export interface StepEditorInputState {
  readonly showTagSuggest: boolean;
  readonly value: string;
  readonly selectedTag?: Tag; // todo: rename to tagSuggestHighlightedTag or similar
  readonly isDirty: boolean;
}

export const StepInputClassNames = {
  StepInputTextArea: "step-input-textarea",
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
  }, [props.step?.text]);

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
      props.onKeyDown(event);
    }
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    handleKeyDownEnterOrTab(event);
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      event.preventDefault();
      return;
    }

    // if (state.isDirty) {
    // event.preventDefault();
    // handleKeyDownEnterOrTab(event);
    // }
  };

  const handleKeyDownEnterOrTab = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    // triggerOnChangeIfDirty(event);
    // props.onGoNext();
  };

  const handleKeyDownEscape = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    setState({
      isDirty: false,
      value: props.step?.text,
      showTagSuggest: false,
    });

    setTimeout(() => {
      textAreaRef?.current?.blur();
    });
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    // triggerOnChangeIfDirty(event);

    props.onGoPrevious();
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (tagSuggestController.tagSuggest.isOpen) {
      return;
    }

    event.preventDefault();

    // triggerOnChangeIfDirty(event);

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

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    props.onFocus?.();
  };

  const triggerOnChangeIfDirty = useCallback(
    (event: SyntheticEvent<HTMLTextAreaElement>) => {
      if (state.isDirty) {
        props.onChange(createTestStepFromText(state.value), event);
      }
    },
    [props, state.isDirty, state.value],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      tagSuggestController.input.handleBlur();

      const didUserSelectFromTagSuggest =
        tagSuggestController.tagSuggest.isOpen;
      if (didUserSelectFromTagSuggest) {
        return;
      }

      triggerOnChangeIfDirty(event);

      props.onBlur();
    },
    [
      tagSuggestController.input,
      tagSuggestController.tagSuggest.isOpen,
      triggerOnChangeIfDirty,
      props,
    ],
  );

  const selectionMeasurerAnchorRef = useRef<HTMLSpanElement>(null);

  return (
    <Styled.Container $isVisible={props.isVisible}>
      <ExpandingTextBox
        ref={textAreaRef}
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
