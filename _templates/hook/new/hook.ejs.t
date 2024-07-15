---
to: <%= h.dir() %>/use-<%= h.name() %>.hook.ts
---

interface Use<%= h.namePascal() %>Params {}

interface Use<%= h.namePascal() %>Result {}

export function use<%= h.namePascal() %>(params: Use<%= h.namePascal() %>Params): Use<%= h.namePascal() %>Result {
  return {};
}
