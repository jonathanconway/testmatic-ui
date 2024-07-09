import styled from "styled-components";

import { ZIndexes } from "../../../z-indexes";

export const StepDisplay = styled.div<{ readonly $isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 5px;

  ${({ $isVisible }) => `
    opacity: ${$isVisible ? "1" : "0"};
    
    // z-Index needs to be adjusted when step display is 
    // - visible, to prevent it from obscuring the auto-suggest popup in a different step editior
    // - not visible, to prevent it from obscuring the textarea in its own step editor
    z-index: ${$isVisible ? ZIndexes.StepEditorDisplayVisible : ZIndexes.StepEditorDisplayNotVisible};
  `}
`;

export const StepTokenText = styled.span``;

export const StepTokenTag = styled.span`
  a {
    color: darkgreen;
    text-decoration: none;

    &:active,
    &:focus,
    &:hover {
      color: green;
      text-decoration: underline;
    }
  }
`;
