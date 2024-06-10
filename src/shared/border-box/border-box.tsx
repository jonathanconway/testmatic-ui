import * as Styled from "./border-box.styles";
import { HTMLAttributes } from "react";

export interface BorderBoxProps extends HTMLAttributes<HTMLDivElement> {}

export function BorderBox(props: BorderBoxProps) {
  return <Styled.BorderBox {...props} />;
}
