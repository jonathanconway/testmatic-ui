import * as Styled from "./test.styles";
import { TextType, TextTypes } from "./text.types";
import { HTMLProps } from "react";

export interface TextProps extends HTMLProps<HTMLDivElement> {
  readonly type?: TextType;
}

export function Text({
  children,
  type = TextTypes.Label,
  ...restProps
}: TextProps) {
  return (
    <Styled.Text $type={type} {...restProps}>
      {children}
    </Styled.Text>
  );
}
