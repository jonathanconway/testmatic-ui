import { buttonBase } from "../button";
import { iconButtonSizes } from "./icon-button.mixins";
import styled from "styled-components";

export const Button = styled.button<{ readonly $size?: "small" | "normal" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${buttonBase}

  ${({ $size }) => iconButtonSizes[$size ?? "normal"]}
`;
