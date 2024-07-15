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
  list-style-position: outside;
`;

export const StepsListItemLabel = styled.label`
  width: 100%;
`;

export const StepsListItem = styled.li<{ readonly $checked: boolean }>`
  display: inline-flex;
  align-items: baseline;
  font-size: 0.85rem;
  border-radius: 0.25rem;

  &:hover,
  &:focus {
    background-color: #efefef;
  }

  &,
  * {
    cursor: pointer;
  }

  ${({ $checked }) =>
    `${
      $checked
        ? `
  &, &:hover, &:focus {
    background-color: #ccffcc;
  }
  `
        : ""
    }`}
`;
