import { css } from "styled-components";

import { controlBase, controlSingleLine } from "../control";

import { textBoxFont } from "./text-box-font.mixin";
import { textBoxPlaceholder } from "./text-box-placeholder.mixin";

export const textBox = css`
  ${controlBase}
  ${controlSingleLine}

  ${textBoxPlaceholder}
  ${textBoxFont}

  width: 100%;
`;
