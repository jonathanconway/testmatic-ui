---
to: <%= h.src() %>/<%= name %>/<%= name %>.tsx
---

import { <%= h.changeCase.pascalCase(name) %>Props } from "./<%= name %>.types";

export function <%= h.changeCase.pascalCase(name) %>(props: <%= h.changeCase.pascalCase(name) %>Props) {
  return (
    <div {...props}>
      {props.children}
    </div>
  );
}
