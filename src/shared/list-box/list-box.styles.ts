import styled from "styled-components";

import { BorderBox } from "../border-box";
import { controlBase } from "../control";

export const Container = styled(BorderBox)`
  ${controlBase}

  height: 100%;
  min-height: 3rem;
  overflow: scroll;
`;
