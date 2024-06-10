import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const TextArea = styled.textarea`
  height: 1.5rem;
  width: 100%;
`;

export const Measurement = styled.span`
  position: absolute;
  visibility: hidden;
`;

export const TagSuggestContainer = styled.div`
  top: 0rem;
  margin-top: 1.75rem;
  position: absolute;
`;

export const FocusAbsorber = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;
