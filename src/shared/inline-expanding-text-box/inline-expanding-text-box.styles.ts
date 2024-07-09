import styled from "styled-components";

import { ExpandingTextBox as ExpandingTextBox_ } from "../expanding-text-box";

export const ExpandingTextBox = styled(ExpandingTextBox_)`
  &:not(:focus):not(:hover) {
    border-color: transparent;
  }

  &::placeholder {
    font-style: italic;
  }
`;
