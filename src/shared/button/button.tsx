import { HTMLProps } from "../utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends HTMLProps<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  > {}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
