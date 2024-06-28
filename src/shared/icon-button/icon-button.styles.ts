import { buttonBase } from "../button";
import { iconButtonSizes } from "./icon-button.mixins";
import styled from "styled-components";

export const Button = styled.button<{ readonly $size?: "small" | "normal" }>`
  ${buttonBase}

  ${({ $size }) => iconButtonSizes[$size ?? "normal"]}
`;
