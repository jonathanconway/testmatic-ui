import { HTMLProps, LegacyRef, forwardRef } from "react";
import * as Styled from "./check-box.styles";

interface CheckBoxProps extends HTMLProps<HTMLInputElement> {}

export const CheckBox = forwardRef((props: CheckBoxProps, ref) => {
  return (
    <Styled.Input
      type="checkbox"
      ref={ref as LegacyRef<HTMLInputElement>}
      {...props}
    />
  );
});
