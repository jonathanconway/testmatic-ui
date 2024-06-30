import { controlSingleLineHeightRem } from "../control";

export const iconButtonSizeSmall = `
  padding: 0;
  width: 1rem;
  height: 1rem;
`;

export const iconButtonSizeNormal = `
  min-height: ${controlSingleLineHeightRem}rem;

  // padding: 0 0.5rem;
`;

export const iconButtonSizes = {
  small: iconButtonSizeSmall,
  normal: iconButtonSizeNormal,
};
