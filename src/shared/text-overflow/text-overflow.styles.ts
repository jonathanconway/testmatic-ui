import styled from "styled-components";

import { Text } from "../text";

import { textOverflow } from "./text-overflow.mixins";

export const TextOverflow = styled(Text)`
  ${textOverflow}
`;
