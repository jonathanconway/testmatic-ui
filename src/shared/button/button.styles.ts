import styled from "styled-components";

export const Button = styled.button<{ readonly size?: "small" | "regular" }>`
  border-radius: 0.25rem;
  border: solid 1px #d0d0d0;

  ${({ size }) => `
  ${
    size === "small"
      ? `
      padding: 0 0.125rem;
      `
      : `
      
      min-height: 1.7rem;
      padding: 0 0.5rem;
      `
  }
  `}

  &:not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      background-color: #dedede;
    }
  }
`;
