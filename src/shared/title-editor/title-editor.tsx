import { InlineExpandingTextBox } from "../text-box/inline-expanding-text-box";
import { Props } from "../utils";

import * as Styled from "./title-editor.styles";

export interface TitleEditorProps
  extends Props<typeof InlineExpandingTextBox> {}

export function TitleEditor({ ...restProps }: TitleEditorProps) {
  return (
    <Styled.Container>
      <InlineExpandingTextBox {...restProps} />
    </Styled.Container>
  );
}
