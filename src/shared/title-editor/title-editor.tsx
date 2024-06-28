import * as Styled from "./title-editor.styles";
import { HTMLProps, useEffect, useRef } from "react";

export interface TitleEditorProps extends HTMLProps<HTMLInputElement> {
  readonly autoSelect?: boolean;
}

export function TitleEditor({ autoSelect, ...restProps }: TitleEditorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoSelect) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [autoSelect]);

  return (
    <Styled.Container>
      <Styled.Input type="text" ref={inputRef} {...restProps} />
      <Styled.Display>{restProps.value}</Styled.Display>
    </Styled.Container>
  );
}
