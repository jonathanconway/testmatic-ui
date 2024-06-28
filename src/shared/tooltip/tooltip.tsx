import * as Styled from "./tooltip.styles";
import { ReactElement, ReactNode, forwardRef } from "react";

export interface TooltipProps {
  readonly children: ReactElement | ReactNode;
  readonly contents?: ReactNode | string;
}

export const Tooltip = forwardRef((props: TooltipProps, ref) => {
  return props.contents ? (
    <Styled.Tooltip title={props.contents} ref={ref}>
      {props.children as any}
    </Styled.Tooltip>
  ) : (
    (props.children as any)
  );
});
