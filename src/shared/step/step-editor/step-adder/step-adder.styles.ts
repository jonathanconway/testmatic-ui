import styled from "styled-components";

export const TextArea = styled.textarea`
  width: calc(100% - 3.25rem);
  height: 1.0625rem;
  padding: 1px 0;
  margin: 2px 0;
  border: none;
  outline-offset: 5px;
  resize: none;

  &::placeholder {
    font-style: italic;
  }
`;
