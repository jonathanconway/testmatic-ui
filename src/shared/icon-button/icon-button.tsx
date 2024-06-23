import { ButtonProps } from "../button";
import { ICON_SYMBOLS, IconName } from "../icon";
import { TypeOfConst } from "../utils";
import * as Styled from "./icon-button.styles";
import { omit } from "lodash";
import { LegacyRef, forwardRef } from "react";

const Icons = {
  Delete: "delete",
} as const;

export type Icon = TypeOfConst<typeof Icons>;

interface IconButtonProps extends ButtonProps {
  readonly icon: IconName;
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    const buttonProps = omit(props, "icon");

    return (
      <Styled.Button {...buttonProps} ref={ref}>
        {ICON_SYMBOLS[props.icon]}
      </Styled.Button>
    );
  }
);
