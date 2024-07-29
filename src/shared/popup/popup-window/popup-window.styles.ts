import styled from "styled-components";

export const Container = styled.div<{ readonly $width?: number | string }>`
  border: solid 1px silver;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  box-shadow: 2px 5px 15px 2px #dedede;
  margin-top: 0.5rem;

  ${({ $width }) => ($width ? `width: ${$width}` : "")}
`;
