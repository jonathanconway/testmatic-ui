import { ReactNode, RefObject, forwardRef } from "react";
import * as Styled from "./text-overflow.styles";
import { TextProps } from "../text";

interface TextOverflowProps extends TextProps {
  readonly children?: ReactNode;
}

export const TextOverflow = forwardRef((props: TextOverflowProps, ref) => {
  return (
    <Styled.TextOverflow {...props} ref={ref as RefObject<HTMLDivElement>} />
  );
});
