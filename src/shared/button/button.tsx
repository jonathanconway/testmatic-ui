import { HTMLProps } from "../utils";
import * as Styled from "./button.styles";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends HTMLProps<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  > {
  readonly size?: "small" | "regular";
}

export function Button({ ...restProps }: ButtonProps) {
  return <Styled.Button {...restProps} />;
}
