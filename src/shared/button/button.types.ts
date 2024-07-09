import { HTMLProps } from "react";

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, "size"> & {
  readonly size?: "small" | "normal";
};
