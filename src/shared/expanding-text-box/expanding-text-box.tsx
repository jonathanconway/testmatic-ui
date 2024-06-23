import * as Styled from "./expanding-text-box.styles";
import { ChangeEvent, FormEvent, HTMLProps, forwardRef, useState } from "react";

interface ExpandingTextBoxProps extends HTMLProps<HTMLTextAreaElement> {}

interface ExpandingTextBoxState {
  readonly value?: string | number | readonly string[] | undefined;
}

export const ExpandingTextBox = forwardRef(
  (props: ExpandingTextBoxProps, ref) => {
    const [state, setState] = useState<ExpandingTextBoxState>({
      value: props.value,
    });

    const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
      const { value } = (event as ChangeEvent<HTMLTextAreaElement>).target;
      setState({ value });
      props.onChange?.(event);
    };

    return (
      <>
        <Styled.TextAreaContainer>
          <Styled.TextArea
            onChange={handleChange}
            ref={ref as React.LegacyRef<HTMLTextAreaElement>}
            {...props}
          />
        </Styled.TextAreaContainer>

        <Styled.Sizer>{state.value}&nbsp;</Styled.Sizer>
      </>
    );
  }
);
