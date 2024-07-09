import { Popper as MUIPopper } from "@mui/base/Popper";
import styled from "styled-components";

import { ZIndexes } from "../z-indexes";

export const Popper = styled(MUIPopper)`
  border: none;
  z-index: ${ZIndexes.Popper};
`;
