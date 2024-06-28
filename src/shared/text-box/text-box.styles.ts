import { textBox } from "./text-box.mixin";
import styled from "styled-components";

export const Input = styled.input<{ readonly $hasError?: boolean }>`
  ${textBox}

  ${({ $hasError }) => ($hasError ? `outline-color: red;` : "")}
`;
