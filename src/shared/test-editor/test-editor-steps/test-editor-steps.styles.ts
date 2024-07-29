import styled from "styled-components";

export const Container = styled.div`
  resize: vertical;
`;

export const StepsHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;

  & > *:first-child {
    flex: 1;
  }
`;

export const StepsMain = styled.div`
  overflow: scroll;
  height: 100%;
  padding-top: 0.25rem;
`;

export const StepsActionContainer = styled.div`
  margin-top: 0.5rem;
`;

export const StepsList = styled.ol`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  counter-reset: item;
`;

export const StepsListItem = styled.li<{ readonly $counter: number }>`
  display: inline-flex;
  font-size: 0.85rem;
  align-items: baseline;

  &:before {
    display: inline-block;
    content: "${({ $counter }) => $counter}. ";
    counter-increment: item;
    width: 1.5em;
  }
`;
