import * as Styled from "./text-box.styles";
import { HTMLProps } from "react";

export interface TextBoxProps extends HTMLProps<HTMLInputElement> {
  readonly hasError?: boolean;
}

export function TextBox(props: TextBoxProps) {
  return <Styled.Input $hasError={props.hasError} {...props} />;
}
