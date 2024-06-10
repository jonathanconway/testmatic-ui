import { HTMLProps } from "../utils";
import { Input } from "./title-editor.styles";
import { InputHTMLAttributes, useEffect, useRef } from "react";

export interface TitleEditorProps
  extends HTMLProps<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>> {
  readonly autoSelect?: boolean;
}

export function TitleEditor({ autoSelect, ...restProps }: TitleEditorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoSelect) {
      setTimeout(() => {
        console.log("auto");
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [autoSelect]);

  return <Input type="text" ref={inputRef} {...restProps} />;
}
