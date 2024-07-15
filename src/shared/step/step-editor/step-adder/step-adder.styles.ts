import styled from "styled-components";

export const TextArea = styled.textarea`
  flex: 1;
  padding: 6px 5px;
  border: none;
  resize: none;

  border-radius: 0.25rem;
  &:hover:not(:focus) {
    outline: solid 1px silver;
    outline-offset: -1px;
  }

  &::placeholder {
    font-style: italic;
  }
`;
