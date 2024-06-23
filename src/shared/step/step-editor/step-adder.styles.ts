import styled from "styled-components";

export const TextArea = styled.textarea`
  width: calc(100% - 4.5rem);
  height: 1.375rem;

  &::placeholder {
    font-style: italic;
  }
`;
