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

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MainContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ActionsContainer = styled.div``;
