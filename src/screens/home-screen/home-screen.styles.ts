import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogoAndTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const H1 = styled.h1`
  font-size: 1.25rem;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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
