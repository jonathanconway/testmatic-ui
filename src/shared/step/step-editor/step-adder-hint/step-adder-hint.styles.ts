import styled from "styled-components";

import { textPlaceholder } from "../../../text";
import { textBoxHoverBorder } from "../../../text-box";

export const Container = styled.div`
  ${textBoxHoverBorder}
  ${textPlaceholder}
  
  margin: 0 -1.5px;
  padding: 5px;
`;
