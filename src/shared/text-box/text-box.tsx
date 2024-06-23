import * as Styled from "./text-box.styles";
import { HTMLProps } from "react";

export interface TextBoxProps extends HTMLProps<HTMLInputElement> {}

export function TextBox(props: TextBoxProps) {
  return <Styled.Input {...props} />;
}
