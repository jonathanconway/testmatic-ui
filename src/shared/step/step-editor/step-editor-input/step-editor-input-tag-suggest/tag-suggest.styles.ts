import styled from "styled-components";

export const PopupContainer = styled.div`
  border: solid 1px silver;
  background-color: white;
  border-radius: 0.5rem;
  z-index: 1;
`;

export const Item = styled.div<{ readonly $highlighted: boolean }>`
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  &:hover {
    background-color: #efefef;
  }

  ${({ $highlighted }) => `
     ${$highlighted ? "background-color: #efefef;" : ""}
  `}
`;