import { WebTarget } from "styled-components";

import * as Styled from "./text-overflow.styles";

type TextOverflowProps<P> = P & {
  readonly as?: WebTarget;
};

export function TextOverflow<P>({ as, ...restProps }: TextOverflowProps<P>) {
  return <Styled.TextOverflow as={as} {...restProps} />;
}
