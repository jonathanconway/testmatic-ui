import { ButtonProps } from "../button";
import { Icon, IconName } from "../icon";

import * as Styled from "./icon-button.styles";
import { LegacyRef, forwardRef } from "react";

interface IconButtonProps extends ButtonProps {
  readonly icon: IconName;
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    const { size, icon, ...restProps } = props;

    return (
      <Styled.Button $size={props.size} {...restProps} type="button" ref={ref}>
        <Icon icon={props.icon} />
      </Styled.Button>
    );
  }
);
