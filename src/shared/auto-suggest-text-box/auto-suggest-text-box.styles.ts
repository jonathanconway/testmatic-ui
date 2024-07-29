import styled from "styled-components";

export const AutoSuggestItems = styled.div`
  border: solid 1px silver;
  background-color: white;
  border-radius: 0.25rem;
  margin-top: 5px;
`;

export const AutoSuggestItem = styled.div<{ readonly $highlighted: boolean }>`
  padding: 0.125rem;
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

  &:hover {
    background-color: #efefef;
  }

  ${({ $highlighted }) => `
     ${$highlighted ? "background-color: #efefef;" : ""}
  `}
`;
