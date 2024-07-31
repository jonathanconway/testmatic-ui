import { last } from "lodash";
import {
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Step, Tag } from "testmatic";

import { useProject } from "../../../../hooks";
import "../../../utils";
import { Maybe, cleanTextForFiltering, timeout } from "../../../utils";

import {
  StepEditorInputSelectionInfo,
  getStepEditorInputSelectionInfo,
  getStepEditorInputValueWithTagInserted,
} from "./step-editor-input-selection";

interface UseStepEditorInputParams {
  readonly step: Step;

  readonly onKeyDown?: KeyboardEventHandler;
  readonly onInput?: FormEventHandler;
  readonly onBlur?: FocusEventHandler;
  readonly onGoPrevious: VoidFunction;
  readonly onGoNext: VoidFunction;
}

interface UseStepEditorInputState {
  readonly input: {
    readonly value: string;
    readonly selectionInfo?: StepEditorInputSelectionInfo;
  };
  readonly suggest: {
    readonly isOpen: boolean;
    readonly filterText: string;
    readonly highlightedSuggestion?: Tag;
    readonly suggestions: readonly Tag[];
  };
}

type UseStepEditorInputRecentEvent = "input" | "select" | "select-suggestion";

export function useStepEditorInput(params: UseStepEditorInputParams) {
  const common = useStepEditorInputCommon(params);

  const input = useStepEditorInputInput(common);

  const suggest = useStepEditorInputSuggest(common);

  const measurer = useStepEditorInputMeasurer(common);

  return {
    input,
    measurer,
    suggest,
  };
}

function useStepEditorInputInput(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { project } = useProject();

  const {
    params,
    state,
    setState,
    setSuggestIsOpen,
    inputLastEvent,
    textAreaRef,
  } = common;

  const {
    handleKeyDownEnterSuggestOpen,
    handleKeyDownTabSuggestOpen,
    handleKeyDownEscapeSuggestOpen,
    handleKeyDownArrowUpSuggestOpen,
    handleKeyDownArrowDownSuggestOpen,
  } = useStepEditorInputSuggestOpen(common);

  const {
    handleKeyDownEnterSuggestClosed,
    handleKeyDownEscapeSuggestClosed,
    handleKeyDownArrowUpSuggestClosed,
    handleKeyDownArrowDownSuggestClosed,
  } = useStepEditorInputSuggestClosed(common);

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    // onSelect occurs after onInput, so we need to communicate to the onSelect
    // handler that it occurred in the context of an input, not only selection.
    inputLastEvent.current = "input";

    setState({
      ...state,
      input: {
        ...state.input,
        value,
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

    params.onKeyDown?.(event);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (state.suggest.isOpen) {
      handleKeyDownEnterSuggestOpen();
    } else {
      handleKeyDownEnterSuggestClosed();
    }
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (state.suggest.isOpen) {
      handleKeyDownTabSuggestOpen(event);
    }
  };

  const handleKeyDownEscape = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    if (state.suggest.isOpen) {
      handleKeyDownEscapeSuggestOpen();
    } else {
      handleKeyDownEscapeSuggestClosed();
    }
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (state.suggest.isOpen) {
      handleKeyDownArrowUpSuggestOpen();
    } else {
      handleKeyDownArrowUpSuggestClosed();
    }
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    if (state.suggest.isOpen) {
      handleKeyDownArrowDownSuggestOpen();
    } else {
      handleKeyDownArrowDownSuggestClosed();
    }
  };

  const handleSelect = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const lastEvent = inputLastEvent.current;
    inputLastEvent.current = "select";

    switch (lastEvent) {
      case "select-suggestion":
        return;
      case "select":
        setState((previousState) => ({
          ...previousState,
          suggest: {
            ...previousState.suggest,
            filterText: "",
          },
        }));
        break;
    }

    const target = event.target as HTMLTextAreaElement;
    const selectionInfo = getStepEditorInputSelectionInfo(target);

    if (selectionInfo) {
      openSuggestWithSelectionHighlighted({ selectionInfo, lastEvent });
    } else {
      setSuggestIsOpen(false);
    }
  };

  const handleBlur = async (event: FocusEvent) => {
    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        value: state.input.value.trim(),
      },
    }));

    // Wait for tag selection to have been handled, if it occurred.
    await timeout(100);

    // If tag selection was handled and focus returned to the input, we don't
    // treat it as a blur.
    if (event.target !== document.activeElement) {
      params.onBlur?.(event);
    }
  };

  /**
   * Open the auto-suggest tags list and highlight the tag at which the cursor
   * is currently positioned in the textArea.
   */
  const openSuggestWithSelectionHighlighted = ({
    selectionInfo,
    lastEvent,
  }: {
    readonly selectionInfo: StepEditorInputSelectionInfo;
    readonly lastEvent?: UseStepEditorInputRecentEvent;
  }) => {
    const newFilterText =
      lastEvent === "input" ? selectionInfo.valueBetweenBrackets : undefined;

    // If there is text in brackets at the cursor, and the last event was an
    // input from the user, use the text to filter the suggestions.
    // Otherwise, just show all tags.
    const suggestions = newFilterText
      ? filterTags(project.tags, newFilterText)
      : project.tags;

    // Highlight the first suggestion by default.
    const highlightedSuggestion = suggestions[0];

    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        selectionInfo,
      },
      suggest: {
        ...previousState.suggest,
        isOpen: true,
        highlightedSuggestion,
        suggestions,
      },
    }));
  };

  return {
    ref: textAreaRef,
    value: state.input.value,
    handleInput,
    handleKeyDown,
    handleSelect,
    handleBlur,
  };
}

function useStepEditorInputSuggestClosed(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { params, state, setState, textAreaRef } = common;

  const handleKeyDownEnterSuggestClosed = () => {
    params.onGoNext();
  };

  const handleKeyDownEscapeSuggestClosed = async () => {
    setState({
      ...state,
      input: {
        ...state.input,
        value: params.step.text,
      },
    });

    await timeout();

    textAreaRef?.current?.blur();
  };

  const handleKeyDownArrowUpSuggestClosed = () => {
    params.onGoPrevious();
  };

  const handleKeyDownArrowDownSuggestClosed = () => {
    params.onGoNext();
  };

  return {
    handleKeyDownEnterSuggestClosed,
    handleKeyDownEscapeSuggestClosed,
    handleKeyDownArrowUpSuggestClosed,
    handleKeyDownArrowDownSuggestClosed,
  };
}

function useStepEditorInputSuggestOpen(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { state, setSuggestIsOpen, setState } = common;

  const { project } = useProject();

  const { autoCompleteTag } = useStepEditorAutoCompleteTag(common);

  const handleKeyDownEnterSuggestOpen = () => {
    autoCompleteTag(state.suggest.highlightedSuggestion);
  };

  const handleKeyDownTabSuggestOpen = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();

    autoCompleteTag(state.suggest.highlightedSuggestion);
  };

  const handleKeyDownEscapeSuggestOpen = () => {
    setSuggestIsOpen(false);
  };

  const handleKeyDownArrowUpSuggestOpen = () => {
    const { tags } = project;

    const newHighlightedTag = state.suggest.highlightedSuggestion
      ? tags[tags.indexOf(state.suggest.highlightedSuggestion) - 1] ??
        last(tags)
      : tags[0];

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion: newHighlightedTag,
      },
    });
  };

  const handleKeyDownArrowDownSuggestOpen = () => {
    const { tags } = project;

    const currentHighlightedTag = state.suggest.highlightedSuggestion
      ? state.suggest.highlightedSuggestion
      : tags[0];

    const newHighlightedTag =
      tags[tags.indexOf(currentHighlightedTag) + 1] ?? tags[0];

    setState({
      ...state,
      suggest: {
        ...state.suggest,
        highlightedSuggestion: newHighlightedTag,
      },
    });
  };

  return {
    handleKeyDownEnterSuggestOpen,
    handleKeyDownTabSuggestOpen,
    handleKeyDownEscapeSuggestOpen,
    handleKeyDownArrowUpSuggestOpen,
    handleKeyDownArrowDownSuggestOpen,
  };
}

function useStepEditorInputSuggest(
  common: ReturnType<typeof useStepEditorInputCommon>,
) {
  const { state, setSuggestIsOpen } = common;

  const { autoCompleteTag } = useStepEditorAutoCompleteTag(common);

  const handleSelect = (tag?: Tag) => {
    autoCompleteTag(tag);
  };

  const handleClose = () => {
    setSuggestIsOpen(false);
  };

  return {
    isOpen: state.suggest.isOpen,
    filterText: state.suggest.filterText,
    highlightedTag: state.suggest.highlightedSuggestion,
    suggestions: state.suggest.suggestions,
    handleSelect,
    handleClose,
  };
}

function useStepEditorAutoCompleteTag({
  textAreaRef,
  inputLastEvent,
  state,
  setState,
}: ReturnType<typeof useStepEditorInputCommon>) {
  const autoCompleteTag = (tag?: Tag) => {
    inputLastEvent.current = "select-suggestion";

    if (!state.input.selectionInfo || !tag) {
      return;
    }

    const value = getStepEditorInputValueWithTagInserted({
      tag: tag,
      currentValue: state.input.value,
      selectionInfo: state.input.selectionInfo,
    });

    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        value,
      },
      suggest: {
        ...previousState.suggest,
        isOpen: false,
      },
    }));

    textAreaRef.current?.focus();
  };

  return { autoCompleteTag };
}

function useStepEditorInputMeasurer({
  state,
}: ReturnType<typeof useStepEditorInputCommon>) {
  const ref = useRef<HTMLSpanElement>(null);

  const value = state.input.value
    ?.toString()
    .substring(0, state.input.selectionInfo?.openBracketIndex);

  return {
    ref,
    value,
  };
}

function useStepEditorInputCommon(params: UseStepEditorInputParams) {
  const { project } = useProject();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const inputLastEvent = useRef<Maybe<UseStepEditorInputRecentEvent>>();

  const [state, setState] = useState<UseStepEditorInputState>({
    input: {
      value: params.step.text,
    },
    suggest: {
      isOpen: false,
      filterText: "",
      suggestions: project.tags,
    },
  });

  useEffect(() => {
    setState((previousState) => ({
      ...previousState,
      input: {
        ...previousState.input,
        value: params.step.text,
        selectionInfo: undefined,
      },
    }));
  }, [params.step]);

  const setSuggestIsOpen = (isOpen: boolean) => {
    setState((previousState) => ({
      ...previousState,
      suggest: {
        ...previousState.suggest,
        isOpen,
        suggestions: project.tags,
      },
    }));
  };

  return {
    params,
    state,
    setState,
    setSuggestIsOpen,
    inputLastEvent,
    textAreaRef,
  };
}

function filterTags(tags: readonly Tag[], filterText: string) {
  if (!filterText.trim()) {
    return tags;
  }

  filterText = cleanTextForFiltering(filterText);

  return tags.filter((tag) =>
    cleanTextForFiltering(tag.title).startsWith(filterText),
  );
}
