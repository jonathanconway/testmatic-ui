import {
  ChangeEvent,
  FormEvent,
  HTMLProps,
  LegacyRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { useTextBoxAutoSelect } from "../use-text-box-auto-select.hook";

import * as Styled from "./expanding-text-box.styles";

interface ExpandingTextBoxProps extends HTMLProps<HTMLTextAreaElement> {
  readonly autoSelect?: boolean;
}

interface ExpandingTextBoxState {
  readonly value?: string | number | readonly string[] | undefined;
}

export const ExpandingTextBox = forwardRef(
  (props: ExpandingTextBoxProps, ref: LegacyRef<HTMLTextAreaElement>) => {
    const { autoSelect, ...restProps } = props;

    const [state, setState] = useState<ExpandingTextBoxState>({
      value: props.value,
    });

    const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
      const { value } = (event as ChangeEvent<HTMLTextAreaElement>).target;
      setState({ value });
      props.onInput?.(event);
    };

    const inputRefLocal = useRef<HTMLTextAreaElement>(null);

    const inputRef = ref ?? (inputRefLocal as any);

    useTextBoxAutoSelect({
      inputRef,
      autoSelect,
    });

    return (
      <Styled.TextAreaContainer>
        <Styled.TextArea ref={inputRef} {...restProps} onInput={handleInput} />
        <Styled.Sizer>{state.value || <>&nbsp;</>}</Styled.Sizer>
      </Styled.TextAreaContainer>
    );
  },
);
