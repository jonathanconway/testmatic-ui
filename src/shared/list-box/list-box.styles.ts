import { BorderBox } from "../border-box";
import { controlBase, controlSingleLineHeightRem } from "../control";
import styled from "styled-components";

export const Container = styled(BorderBox)`
  ${controlBase}

  height: 100%;
  min-height: ${controlSingleLineHeightRem}rem;
  overflow: scroll;
`;
