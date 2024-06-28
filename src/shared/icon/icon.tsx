import { ButtonProps } from "../button";
import { ICON_EMOJIS } from "./icon-emojis";
import { IconName as Icon_ } from "./icon-names";
import { ICON_SYMBOLS } from "./icon-symbols";
import * as Styled from "./icon.styles";
import { LegacyRef, forwardRef } from "react";

interface IconProps extends ButtonProps {
  readonly icon: Icon_;
  readonly color?: "default" | "red";
}

export const Icon = forwardRef(
  (props: IconProps, ref: LegacyRef<HTMLButtonElement>) => {
    const { icon, color, ...restProps } = props;

    return (
      <Styled.Container {...restProps} $color={props.color} ref={ref}>
        {ICON_SYMBOLS[props.icon] ?? ICON_EMOJIS[props.icon]}
      </Styled.Container>
    );
  }
);
