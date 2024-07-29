import { css } from "styled-components";

export const controlBorder = css`
  border: solid 1px silver;
  border-radius: 0.25rem;
`;

export const controlPadding = css`
  padding: 0.25rem;
`;

export const controlFont = css`
  font-size: 0.85rem;
`;

export const controlBase = css`
  ${controlBorder}
  ${controlPadding}
  ${controlFont}
`;

export const controlSingleLineHeightRem = 1.625;

export const controlSingleLine = css`
  height: ${controlSingleLineHeightRem}rem;
`;
