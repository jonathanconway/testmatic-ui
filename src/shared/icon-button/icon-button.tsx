import { LegacyRef, forwardRef } from "react";

import { ButtonProps } from "../button";
import { ICON_SYMBOLS, IconName } from "../icon";
import { ICON_EMOJIS } from "../icon/icon-emojis";

import * as Styled from "./icon-button.styles";

interface IconButtonProps extends ButtonProps {
  readonly icon: IconName;
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    const { size, icon, ...restProps } = props;

    return (
      <Styled.Button $size={props.size} {...restProps} type="button" ref={ref}>
        {ICON_SYMBOLS[props.icon] ?? ICON_EMOJIS[props.icon]}
      </Styled.Button>
    );
  },
);
