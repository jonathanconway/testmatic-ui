import * as Styled from "./chip.styles";
import { HTMLProps } from "react";

export interface ChipProps extends HTMLProps<HTMLSpanElement> {}

export function Chip(props: ChipProps) {
  return <Styled.Chip {...props} />;
}
