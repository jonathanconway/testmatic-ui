import { controlSingleLineHeightRem } from "../control";

export const iconButtonSizeSmall = `
  padding: 0 0.25rem;
  width: 1.25rem;
`;

export const iconButtonSizeNormal = `
  min-height: ${controlSingleLineHeightRem}rem;

  padding: 0 0.5rem;
`;

export const iconButtonSizes = {
  small: iconButtonSizeSmall,
  normal: iconButtonSizeNormal,
};
