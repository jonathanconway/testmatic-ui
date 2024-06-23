import { ButtonProps } from "../button";
import { IconName as Icon_ } from "./icon-names";
import { ICON_SYMBOLS } from "./icon-symbols";
import * as Styled from "./icon.styles";
import { LegacyRef, forwardRef } from "react";

interface IconProps extends ButtonProps {
  readonly icon: Icon_;
}

export const Icon = forwardRef(
  (props: IconProps, ref: LegacyRef<HTMLButtonElement>) => {
    return (
      <Styled.Container {...props} ref={ref}>
        {ICON_SYMBOLS[props.icon]}
      </Styled.Container>
    );
  }
);
