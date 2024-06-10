import { Container } from "./list-box.styles";
import { ReactNode } from "react";

export interface ListBoxProps {
  readonly children?: ReactNode;
}

export function ListBox(props: ListBoxProps) {
  return <Container>{props.children}</Container>;
}
