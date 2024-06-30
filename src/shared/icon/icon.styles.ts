import styled from "styled-components";

export const Container = styled.span<{ readonly $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.8rem;
`;
