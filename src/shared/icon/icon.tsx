import { LegacyRef, forwardRef } from "react";

import { ButtonProps } from "../button";

import { ICON_EMOJIS } from "./icon-emojis";
import { IconName as Icon_ } from "./icon-names";
import { ICON_SYMBOLS } from "./icon-symbols";
import * as Styled from "./icon.styles";

interface IconProps extends ButtonProps {
  readonly icon: Icon_;
  readonly color?: "default" | "red";
  readonly cursor?: string;
}

export const Icon = forwardRef(
  (props: IconProps, ref: LegacyRef<HTMLButtonElement>) => {
    const { icon, color, cursor, ...restProps } = props;

    return (
      <Styled.Container
        {...restProps}
        $color={props.color}
        $cursor={props.cursor}
        ref={ref}
      >
        {ICON_SYMBOLS[props.icon] ?? ICON_EMOJIS[props.icon]}
      </Styled.Container>
    );
  },
);
