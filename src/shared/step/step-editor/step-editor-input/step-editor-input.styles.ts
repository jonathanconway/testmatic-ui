import styled from "styled-components";

import { ZIndexes } from "../../../z-indexes";

export const Container = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  position: relative;

  ${({ $isVisible }) => `
    opacity: ${$isVisible ? 1 : 0};
  `}
`;

export const SelectionMeasurer = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${ZIndexes.StepEditorInputSelectionMeasurer};
  width: 100%;
  padding: 5px;
`;

export const SelectionMeasurerAnchor = styled.span``;
