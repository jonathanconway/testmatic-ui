import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const Input = styled.input`
  position: absolute;
  z-index: 1;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  height: 100%;
  width: 100%;
  border: none;
  margin: 0;
  // padding: 0.375rem 0;
  flex: 1;
  opacity: 0;

  &:focus {
    opacity: 1;
  }
`;

export const Display = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  margin: 0;
  // padding: 0.375rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
`;
