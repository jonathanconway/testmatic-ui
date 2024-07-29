import {
  ChangeEvent,
  FormEvent,
  HTMLProps,
  KeyboardEvent,
  useRef,
  useState,
} from "react";

import { cleanTextForFiltering, timeout } from "../utils";

export interface UseAutoSuggestTextBoxParams
  extends HTMLProps<HTMLInputElement> {
  readonly items: readonly string[];

  readonly onSelectItem: (item: string) => void;
}

export interface UseAutoSuggestTextBoxState {
  readonly isOpen: boolean;
  readonly filterText: string;
  readonly filteredSuggestions: readonly string[];
  readonly highlightedSuggestion: string;
}

export function useAutoSuggestTextBox(params: UseAutoSuggestTextBoxParams) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<UseAutoSuggestTextBoxState>({
    isOpen: false,
    filterText: "",
    filteredSuggestions: params.items,
    highlightedSuggestion: params.items[0],
  });

  const openWithDefaults = () => {
    setState({
      ...state,
      isOpen: true,
      filterText: "",
      filteredSuggestions: params.items,
      highlightedSuggestion: params.items[0],
    });
  };

  const handleInputFocus = () => {
    openWithDefaults();
  };

  const handleInputBlur = async () => {
    await timeout(100);

    setState({
      ...state,
      isOpen: false,
    });
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Escape":
        handleKeyDownEscape();
        break;
      case "Tab":
        handleKeyDownTab(event);
        break;
      case "Enter":
        handleKeyDownEnter(event);
        break;
      case "ArrowUp":
        handleKeyDownArrowUp(event);
        break;
      case "ArrowDown":
        handleKeyDownArrowDown(event);
        break;
    }
  };

  const handleKeyDownEscape = () => {
    if (state.isOpen) {
      setState({ ...state, isOpen: false });
    }
  };

  const handleKeyDownTab = (event: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDownTabOrEnter(event);
  };

  const handleKeyDownTabOrEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (state.isOpen && state.highlightedSuggestion) {
      event.preventDefault();
      handlePopupSuggestionSelect(state.highlightedSuggestion);
    }
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (state.isOpen) {
      const currentHighlightedSuggestion = state.highlightedSuggestion
        ? state.highlightedSuggestion
        : state.filteredSuggestions[0];

      const highlightedSuggestion =
        state.filteredSuggestions[
          state.filteredSuggestions.indexOf(currentHighlightedSuggestion) - 1
        ] ?? state.filteredSuggestions.slice(-1)[0];

      setState({
        ...state,
        highlightedSuggestion,
      });
    } else {
      openWithDefaults();
    }
  };

  const handleKeyDownArrowDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (state.isOpen) {
      const currentHighlightedSuggestion = state.highlightedSuggestion
        ? state.highlightedSuggestion
        : state.filteredSuggestions[0];

      const highlightedSuggestion =
        state.filteredSuggestions[
          state.filteredSuggestions.indexOf(currentHighlightedSuggestion) + 1
        ] ?? state.filteredSuggestions[0];

      setState({
        ...state,
        highlightedSuggestion,
      });
    } else {
      openWithDefaults();
    }
  };

  const handlePopupSuggestionSelect = async (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }

    setState({
      ...state,
      isOpen: false,
    });

    params.onSelectItem(suggestion);
  };

  const handleInputInput = (event: FormEvent<HTMLInputElement>) => {
    const filterText = (event as ChangeEvent<HTMLInputElement>).target.value;

    const filterTextCleaned = cleanTextForFiltering(filterText);

    const filteredSuggestions = params.items.filter((item) =>
      cleanTextForFiltering(item).startsWith(filterTextCleaned),
    );

    const highlightedSuggestion = filteredSuggestions.includes(
      state.highlightedSuggestion,
    )
      ? state.highlightedSuggestion
      : filteredSuggestions[0];

    setState({
      ...state,
      filterText,
      filteredSuggestions,
      highlightedSuggestion,
    });

    params.onInput?.(event);
  };

  return {
    input: {
      ref: inputRef,
      handleKeyDown: handleInputKeyDown,
      handleInput: handleInputInput,
      handleFocus: handleInputFocus,
      handleBlur: handleInputBlur,
    },
    popup: {
      isOpen: state.isOpen,
    },
    suggestions: {
      filteredSuggestions: state.filteredSuggestions,
      highlightedSuggestion: state.highlightedSuggestion,
      handleSuggestionSelect: handlePopupSuggestionSelect,
    },
  };
}
