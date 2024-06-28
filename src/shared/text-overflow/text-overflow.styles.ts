import styled from "styled-components";
import { Text } from "../text";

export const TextOverflow = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
