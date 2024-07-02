import { css } from "styled-components";

import { controlSingleLineHeightRem } from "../control";

export const buttonBase = css`
  border-radius: 0.25rem;
  border: solid 1px #d0d0d0;
  background-color: #efefef;
  font-size: 0.85rem;

  &:not(:disabled) {
    &,
    & {
      cursor: pointer;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: #dedede;
    }
  }
`;

export const buttonSizeSmall = css`
  padding: 0 0.5rem;
`;

export const buttonSizeNormal = css`
  min-height: ${controlSingleLineHeightRem}rem;

  padding: 0 0.5rem;
`;

export const buttonSizes = {
  small: buttonSizeSmall,
  normal: buttonSizeNormal,
};
