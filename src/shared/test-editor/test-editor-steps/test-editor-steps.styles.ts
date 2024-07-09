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

export const StepsListItem = styled.li`
  display: inline-flex;
  // margin: 0.25rem;
  font-size: 0.85rem;
  align-items: center;

  &:before {
    display: inline-block;
    content: counter(item) ". ";
    counter-increment: item;
    width: 1.5em;
    margin-right: 0.5rem;
  }
`;
