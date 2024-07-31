import {
  ChangeEvent,
  FormEvent,
  HTMLProps,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";

import { KeyCodes } from "../../../hooks/keyboard";

import { addHTMLLineBreaksToPlainText } from "./expanding-text-box.utils";

interface UseExpandingTextBoxParams extends HTMLProps<HTMLTextAreaElement> {}

interface ExpandingTextBoxState {
  readonly value?: string | number | readonly string[] | undefined;
}

export function useExpandingTextBox(params: UseExpandingTextBoxParams) {
  const [state, setState] = useState<ExpandingTextBoxState>({
    value: params.value || params.defaultValue,
  });

  useEffect(() => {
    setState(() => ({
      value: params.value || params.defaultValue,
    }));
  }, [params.value, params.defaultValue]);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = (event as ChangeEvent<HTMLTextAreaElement>).target;

    const value = handleInputDisallowLinebreak(target);

    setState({ value });

    params.onInput?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDownDisallowLinebreak(event);

    params.onKeyDown?.(event);
  };

  // Disallow line breaks handlers

  const handleInputDisallowLinebreak = (target: HTMLTextAreaElement) => {
    const value = target.value;

    // Disallow line-breaks when rows=1
    if (params.rows === 1 && params.rows === 1) {
      return value.replaceAllRecursive(/\n/g, "");
    }
    return value;
  };

  const handleKeyDownDisallowLinebreak = (event: KeyboardEvent) => {
    // Disallow line-breaks when rows=1
    if (params.rows === 1 && event.key === KeyCodes.Enter) {
      (event.target as HTMLTextAreaElement).blur();
    }
  };

  const isEmpty = !state.value || String(state.value).trim() === "";

  const sizerValue = addHTMLLineBreaksToPlainText(state.value);

  return {
    isEmpty,
    sizerValue,

    handleInput,
    handleKeyDown,
  };
}
