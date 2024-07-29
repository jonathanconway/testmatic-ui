import { HTMLProps, LegacyRef, forwardRef } from "react";

import * as Styled from "./text-box.styles";

export interface TextBoxProps extends HTMLProps<HTMLInputElement> {
  readonly hasError?: boolean;
}

export const TextBox = forwardRef(
  (props: TextBoxProps, ref: LegacyRef<HTMLInputElement>) => {
    const { hasError, ...restProps } = props;

    return <Styled.Input $hasError={props.hasError} ref={ref} {...restProps} />;
  },
);
