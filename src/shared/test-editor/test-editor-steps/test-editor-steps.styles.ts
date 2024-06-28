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
  margin: 0.25rem 0;
  font-size: 0.85rem;
  display: block;
  margin-left: 0.25rem;
  display: inline-flex;
  align-items: center;

  &:before {
    display: inline-block;
    content: counter(item) ". ";
    counter-increment: item;
    width: 1.5em;
    margin-right: 0.5rem;
  }
`;
