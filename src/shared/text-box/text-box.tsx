import { HTMLProps } from "react";

import * as Styled from "./text-box.styles";

export interface TextBoxProps extends HTMLProps<HTMLInputElement> {
  readonly hasError?: boolean;
}

export function TextBox(props: TextBoxProps) {
  const { hasError, ...restProps } = props;

  return <Styled.Input $hasError={props.hasError} {...restProps} />;
}
