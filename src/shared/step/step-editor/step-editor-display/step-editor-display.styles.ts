import styled from "styled-components";

import { ZIndexes } from "../../../z-indexes";

export const StepDisplay = styled.div<{
  readonly $isVisible: boolean;
}>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 5px;
  cursor: text;

  ${({ $isVisible }) => `
    opacity: ${$isVisible ? "1" : "0"};
  `}
`;

export const StepTokenText = styled.span``;

export const StepTokenTag = styled.span`
  a {
    position: relative;
    color: darkgreen;
    text-decoration: none;
    z-index: ${ZIndexes.StepEditorDisplayStepTokenTag};

    &:active,
    &:focus,
    &:hover {
      color: green;
      text-decoration: underline;
    }
  }
`;
