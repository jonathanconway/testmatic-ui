import styled from "styled-components";

export const Container = styled.div`
  border: solid 1px silver;
  background-color: white;
  border-radius: 0.5rem;
`;

export const Item = styled.div<{ readonly selected: boolean }>`
  padding: 0.25rem 0.5rem;
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

  ${({ selected }) => `
     ${selected ? "background-color: #efefef;" : ""}
  `}
`;
