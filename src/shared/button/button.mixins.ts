import { controlSingleLineHeightRem } from "../control";
import { css } from "styled-components";

export const buttonBase = css`
  border-radius: 0.25rem;
  border: solid 1px #d0d0d0;

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
