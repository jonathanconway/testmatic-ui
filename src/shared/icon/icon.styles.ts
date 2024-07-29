import styled from "styled-components";

export const Container = styled.span<{
  readonly $color?: string;
  readonly $cursor?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1.25rem;
  height: 1.25rem;
  font-size: 0.8rem;

  color: ${({ $color }) => $color ?? "inherit"};
  cursor: ${({ $cursor }) => $cursor ?? "inherit"};
`;
