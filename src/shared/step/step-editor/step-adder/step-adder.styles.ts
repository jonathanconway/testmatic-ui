import styled from "styled-components";

export const TextArea = styled.textarea`
  // width: calc(100% - 3rem);
  flex: 1;
  height: 1.0625rem;
  padding: 1px 0;
  margin: 6px 5px;
  border: none;
  outline-offset: 5px;
  resize: none;

  &::placeholder {
    font-style: italic;
  }
`;
