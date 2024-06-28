import {
  // ToggleButton as MUIToggleButton,
  ToggleButtonGroup as MUIToggleButtonGroup,
} from "@mui/material";
import { MouseEvent, ReactNode } from "react";
import { Props } from "../utils";
import { Stack } from "../layout";
import * as Styled from "./toggle-buttons.styles";

interface ToggleButtonsProps
  extends Omit<Props<typeof MUIToggleButtonGroup>, "onChange"> {
  readonly children?: ReactNode;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

export function ToggleButtons(props: ToggleButtonsProps) {
  const { value, onChange, ...restProps } = props;

  const handleChange = (_: MouseEvent<HTMLElement>, value: string) => {
    props.onChange?.(value);
  };

  return (
    <MUIToggleButtonGroup
      color="primary"
      value={props.value}
      exclusive
      {...restProps}
      onChange={handleChange}
    >
      {props.children}
    </MUIToggleButtonGroup>
  );
}

interface ToggleButtonProps {
  readonly value: string;
  readonly children?: ReactNode;
}

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <Styled.ToggleButton value={props.value}>
      <Stack direction="row" alignContent="center">
        {props.children}
      </Stack>
    </Styled.ToggleButton>
  );
}
