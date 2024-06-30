import { HTMLProps, ReactNode } from "react";

import * as Styled from "./toggle-button.styles";

interface ToggleButtonProps extends HTMLProps<HTMLInputElement> {
  readonly value: string;
  readonly children?: ReactNode;
  readonly isSelected?: boolean;
}

export function ToggleButton(props: ToggleButtonProps) {
  const { value, children, isSelected, ...restProps } = props;

  return (
    <Styled.ToggleButton
      htmlFor={`toggle-button-${props.value}`}
      $isSelected={props.isSelected}
    >
      <input
        type="radio"
        id={`toggle-button-${props.value}`}
        value={props.value}
        {...restProps}
      />
      {props.children}
    </Styled.ToggleButton>
  );
}
