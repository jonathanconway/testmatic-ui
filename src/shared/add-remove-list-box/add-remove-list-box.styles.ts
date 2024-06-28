import { controlSingleLineHeightRem } from "../control";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: ${controlSingleLineHeightRem}rem;
`;
