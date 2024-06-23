import { buttonBase, buttonSizes } from "./button.mixins";
import styled from "styled-components";

export const Button = styled.button<{ readonly size?: "small" | "normal" }>`
  ${buttonBase}

  ${({ size }) => buttonSizes[size ?? "normal"]}
`;
