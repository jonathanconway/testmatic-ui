import styled from "styled-components";

import { buttonBase, buttonDefault, buttonSizes } from "./button.mixins";
import { ButtonProps } from "./button.types";

export const Button = styled.button<ButtonProps>`
  ${buttonBase}

  ${({ size }) => buttonSizes[size ?? "normal"]}

  ${buttonDefault}
`;
