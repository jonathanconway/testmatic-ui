import { HTMLProps, ReactNode } from "react";

import { Popover } from "../popover";
import { TextBox } from "../text-box";

import * as Styled from "./auto-suggest-text-box.styles";
import { useAutoSuggestTextBox } from "./use-auto-suggest-text-box.hook";

interface AutoSuggestTextBoxProps extends HTMLProps<HTMLInputElement> {
  readonly items: readonly string[];

  readonly renderSuggestion?: (item: string) => ReactNode;

  readonly onSelectItem: (item: string) => void;
}

export function AutoSuggestTextBox(props: AutoSuggestTextBoxProps) {
  const { input, popup, suggestions } = useAutoSuggestTextBox(props);

  const { items, renderSuggestion, onSelectItem, ...restProps } = props;

  return (
    <>
      <TextBox
        {...restProps}
        ref={input.ref}
        onKeyDown={input.handleKeyDown}
        onInput={input.handleInput}
        onFocus={input.handleFocus}
        onBlur={input.handleBlur}
      />

      <Popover anchorElement={input.ref.current} isOpen={popup.isOpen}>
        <Styled.AutoSuggestItems>
          {suggestions.filteredSuggestions?.map(
            (suggestion, suggestionIndex) => (
              <Styled.AutoSuggestItem
                key={`${suggestion}_${suggestionIndex}`}
                $highlighted={suggestion === suggestions.highlightedSuggestion}
                onClick={() => suggestions.handleSuggestionSelect(suggestion)}
              >
                {props.renderSuggestion
                  ? props.renderSuggestion(suggestion)
                  : suggestion}
              </Styled.AutoSuggestItem>
            ),
          )}
        </Styled.AutoSuggestItems>
      </Popover>
    </>
  );
}
