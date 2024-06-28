import * as Styled from "./button.styles";
import { HTMLProps, LegacyRef, forwardRef } from "react";

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, "size"> & {
  readonly size?: "small" | "normal";
};

export const Button = forwardRef(
  ({ ...restProps }: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    return <Styled.Button {...restProps} type="button" ref={ref} />;
  }
);
