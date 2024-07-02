import styled from "styled-components";

export const Container = styled.div<{ $isVisible: boolean }>`
  width: 100%;

  ${({ $isVisible }) => `
    opacity: ${$isVisible ? 1 : 0};
    position: ${$isVisible ? "relative" : "absolute"};
    top: ${$isVisible ? "unset" : "-100rem"};
  `}
`;

export const SelectionMeasurer = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`;

export const SelectionMeasurerAnchor = styled.span``;
