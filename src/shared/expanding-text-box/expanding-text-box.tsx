import { ChangeEvent, FormEvent, HTMLProps, forwardRef, useState } from "react";

import * as Styled from "./expanding-text-box.styles";

interface ExpandingTextBoxProps extends HTMLProps<HTMLTextAreaElement> {}

interface ExpandingTextBoxState {
  readonly value?: string | number | readonly string[] | undefined;
}

export const ExpandingTextBox = forwardRef(
  (props: ExpandingTextBoxProps, ref) => {
    const [state, setState] = useState<ExpandingTextBoxState>({
      value: props.value,
    });

    const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
      const { value } = (event as ChangeEvent<HTMLTextAreaElement>).target;
      setState({ value });
      props.onInput?.(event);
    };

    return (
      <Styled.TextAreaContainer>
        <Styled.TextArea
          ref={ref as React.LegacyRef<HTMLTextAreaElement>}
          {...props}
          onInput={handleInput}
        />
        <Styled.Sizer>{state.value || <>&nbsp;</>}</Styled.Sizer>
      </Styled.TextAreaContainer>
    );
  },
);
