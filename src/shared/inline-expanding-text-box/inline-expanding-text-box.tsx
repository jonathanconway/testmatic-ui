import { ExpandingTextBox } from "../expanding-text-box";
import { Props } from "../utils";

import * as Styled from "./inline-expanding-text-box.styles";

export function InlineExpandingTextBox(props: Props<typeof ExpandingTextBox>) {
  const { ref, ...restProps } = props;
  return <Styled.ExpandingTextBox {...restProps} />;
}
