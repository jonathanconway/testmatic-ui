import { StackOrders } from "../../stack-order";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const TextAreaContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const TextArea = styled.textarea`
  position: absolute;
  top: -3px;
  bottom: 0;
  right: 0;
  left: -3px;
  height: calc(100% + 6px);
  width: 100%;

  // letter-spacing: 0.17px;
  font-size: 0.85rem;
`;

export const Measurement = styled.span`
  position: absolute;
  visibility: hidden;
`;

export const TagSuggestContainer = styled.div`
  top: 0rem;
  margin-top: 1.75rem;
  position: absolute;
  background-color: white;
  z-index: ${StackOrders.AutoSuggest};
`;

export const FocusAbsorber = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const StepDisplay = styled.div``;
