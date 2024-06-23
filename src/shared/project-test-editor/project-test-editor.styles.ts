import { borderBox } from "../border-box";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const H2 = styled.h2`
  display: flex;
  width: 100%;
  margin: 0;
  align-items: center;
  height: 1.7rem;
  font-size: 1.1rem;
`;

export const H3 = styled.h3`
  margin: 0;
  font-size: 0.9rem;
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

export const StepsContainer = styled.div`
  ${borderBox}
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

export const OtherContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 50%;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 50%;
`;

export const RunsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;
