import styled from "styled-components";

import { StepEditorDisplay as StepEditorDisplay_ } from "./step-editor-display";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MainContainer = styled.div`
  position: relative;
  width: 100%;

  border-radius: 0.25rem;
  &:hover {
    outline: solid 1px silver;
    outline-offset: -1px;
  }
`;

export const ActionsContainer = styled.div``;

export const StepEditorDisplay = styled(StepEditorDisplay_)`
  // z-overlap with ExpandingTextArea
  position: absolute;
`;
