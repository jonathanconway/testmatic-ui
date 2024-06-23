import * as Styled from "./tooltip.styles";
// import { isString } from "lodash";
import { ReactElement, ReactNode, forwardRef } from "react";

export interface TooltipProps {
  readonly children: ReactElement | ReactNode;
  readonly contents: ReactNode | string;
}

// function elementWithAddedProps({
//   element,
//   props,
// }: {
//   element: ReactElement;
//   props: object;
// }) {
//   return {
//     ...element,
//     props: {
//       ...element.props,
//       ...props,
//     },
//   };
// }

// function addTitleToChildren(props: TooltipProps) {
//   return isString(props.contents)
//     ? elementWithAddedProps({
//         element: props.children,
//         props: { title: props.contents },
//       })
//     : props.children;
// }

export const Tooltip = forwardRef((props: TooltipProps, ref) => {
  return (
    <Styled.Tooltip title={props.contents} ref={ref}>
      {props.children as any}
    </Styled.Tooltip>
  );
});
