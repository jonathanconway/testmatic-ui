import { ChangeEvent, FormEvent, HTMLProps, useEffect, useState } from "react";

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
    const value = (event as ChangeEvent<HTMLTextAreaElement>).target.value;

    setState({ value });

    params.onInput?.(event);
  };

  const isEmpty = !state.value || String(state.value).trim() === "";

  const sizerValue = addHTMLLineBreaksToPlainText(state.value);

  return {
    isEmpty,
    sizerValue,

    handleInput,
  };
}
