import { isString } from "lodash";
import { ReactNode, forwardRef } from "react";

import * as Styled from "./tooltip.styles";

export interface TooltipProps {
  readonly children: ReactNode | string;
  readonly contents?: ReactNode | string;
}

function convertContentsToReactNode(contents?: ReactNode | string) {
  if (!contents) {
    return undefined;
  }

  if (isString(contents)) {
    return <>{contents}</>;
  }

  return contents;
}

export const Tooltip = forwardRef((props: TooltipProps, ref) => {
  const contents = convertContentsToReactNode(props.contents);
  const children = convertContentsToReactNode(props.children);

  return contents ? (
    <Styled.Tooltip title={contents} ref={ref}>
      {children as any}
    </Styled.Tooltip>
  ) : (
    (children as any)
  );
});
