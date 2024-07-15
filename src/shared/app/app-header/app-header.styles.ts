import { Link as Link_ } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(Link_)`
  text-decoration: none;
  color: initial;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
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
