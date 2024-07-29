import { ExpandingTextBox } from "../text-box";
import { Props } from "../utils";

import * as Styled from "./title-editor.styles";

export interface TitleEditorProps extends Props<typeof ExpandingTextBox> {}

export function TitleEditor({ ...restProps }: TitleEditorProps) {
  return (
    <Styled.Container>
      <ExpandingTextBox {...restProps} outdent rows={1} />
    </Styled.Container>
  );
}
