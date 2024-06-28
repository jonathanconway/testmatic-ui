import { ToggleButton as MUIToggleButton } from "@mui/material";
import styled from "styled-components";

export const ToggleButton = styled(MUIToggleButton)`
  border-radius: 0.25rem;
  border: solid 1px #d0d0d0;
  padding: 0.125rem 0.5rem;

  &:not(:disabled) {
    &,
    & {
      cursor: pointer;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: #dedede;
    }
  }
`;
