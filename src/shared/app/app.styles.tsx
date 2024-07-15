import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: #f2f2f2;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex: 1;
  overflow: scroll;

  & > :first-child {
    width: 30%;
    max-width: 25rem;
    resize: horizontal;
  }
`;
