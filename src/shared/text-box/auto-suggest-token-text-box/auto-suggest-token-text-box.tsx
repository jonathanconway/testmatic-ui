import { HTMLProps, ReactNode } from "react";

import { ExpandingTextBox } from "../expanding-text-box";

interface AutoSuggestTokenTextBoxProps extends HTMLProps<HTMLTextAreaElement> {
  readonly openSuggestionsSignalCharacter: string;
  readonly closeSuggestionsSignalCharacter: string;

  readonly suggestions: readonly string[];
  readonly renderSuggestion: (suggestion: string) => ReactNode;
}

export function AutoSuggestTokenTextBox(props: AutoSuggestTokenTextBoxProps) {
  const {
    openSuggestionsSignalCharacter,
    closeSuggestionsSignalCharacter,
    suggestions,
    renderSuggestion,
    ...restProps
  } = props;

  return <ExpandingTextBox {...restProps} />;
}
