import { ReactNode } from "react";
import * as Styled from "./toggle-buttons.styles";

interface ToggleButtonsProps {
  readonly children?: ReactNode;
}

export function ToggleButtons(props: ToggleButtonsProps) {
  return <Styled.ToggleButtons>{props.children}</Styled.ToggleButtons>;
}
