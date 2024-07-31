import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { Tag } from "testmatic";

import { useProject } from "../../../../hooks";
import { cleanTextForFiltering, timeout } from "../../../utils";

import {
  StepEditorInputSelectionInfo,
  getStepEditorInputSelectionInfo,
} from "./step-editor-input-selection";
import { useStepEditorInputCommon } from "./use-step-editor-input-common.hook";
import { useStepEditorInputSuggestClosed } from "./use-step-editor-input-suggest-closed.hook";
import { useStepEditorInputSuggestOpen } from "./use-step-editor-input-suggest-open.hook";
import { UseStepEditorInputRecentEvent } from "./use-step-editor-input.types";

export function useStepEditorInputInput(
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

function filterTags(tags: readonly Tag[], filterText: string) {
  if (!filterText.trim()) {
    return tags;
  }

  filterText = cleanTextForFiltering(filterText);

  return tags.filter((tag) =>
    cleanTextForFiltering(tag.title).startsWith(filterText),
  );
}
