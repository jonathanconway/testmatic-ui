import { HTMLProps } from "../utils";
import * as Styled from "./button.styles";
import { ButtonHTMLAttributes, LegacyRef, forwardRef } from "react";

export interface ButtonProps
  extends HTMLProps<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  > {
  readonly size?: "small" | "normal";
}

export const Button = forwardRef(
  ({ ...restProps }: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    return <Styled.Button {...restProps} ref={ref} />;
  }
);
