import { css } from "styled-components";

import { textPlaceholder } from "../text";

export const textBoxPlaceholder = css`
  &::placeholder {
    ${textPlaceholder}
  }
`;
