import { textBox } from "../text-box";
import styled from "styled-components";

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
  ${textBox}

  position: absolute;
  top: -5px;
  bottom: 0;
  right: 0;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  resize: none;
`;

export const Sizer = styled.span`
  visibility: hidden;
`;
