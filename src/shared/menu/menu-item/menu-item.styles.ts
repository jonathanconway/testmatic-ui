import styled from "styled-components";

export const MenuItem = styled.div<{ readonly $isHighlighted: boolean }>`
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  &:hover,
  &:focus {
    background-color: #efefef;
  }

  ${({ $isHighlighted }) => `
    ${$isHighlighted ? "background-color: #efefef;" : ""}
  `}
`;
