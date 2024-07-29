import { css } from "styled-components";

export const textBoxHoverBorder = css`
  &:not(:focus):not(:hover) {
    border-color: transparent;
  }
`;
