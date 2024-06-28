import styled from "styled-components";

export const Container = styled.span<{ readonly $color?: string }>`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ $color }) => $color ?? "default"};
`;
