import { Box } from "../box";
import { borderBox } from "./border-box.mixin";
import styled from "styled-components";

export const BorderBox = styled(Box)`
  ${borderBox}
`;
