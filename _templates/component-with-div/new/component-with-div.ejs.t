---
to: <%= h.dir() %>/<%= h.name() %>/<%= h.name() %>.tsx
---
import { HTMLProps } from "react";

interface <%= h.namePascal() %>Props extends HTMLProps<HTMLDivElement> {}

export function <%= h.namePascal() %>(props: <%= h.namePascal() %>Props) {
  const { ...restProps } = props;

  return (
    <div {...restProps}></div>
  );
}
