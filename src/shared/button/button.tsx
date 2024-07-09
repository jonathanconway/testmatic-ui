import { LegacyRef, forwardRef } from "react";

import * as Styled from "./button.styles";
import { ButtonProps } from "./button.types";

export const Button = forwardRef(
  (props: ButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    return <Styled.Button {...props} type="button" ref={ref} />;
  },
);
