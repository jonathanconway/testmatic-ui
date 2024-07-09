import styled from "styled-components";

import { textBox } from "../text-box";

export const TextAreaContainer = styled.div`
  position: relative;
  min-height: 1.7rem;
`;

export const TextArea = styled.textarea`
  ${textBox}

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 0.85rem;
`;

export const Sizer = styled.span`
  visibility: hidden;
  font-size: 0.85rem;
  display: flex;
  padding: calc(
    0.25rem + 1px
  ); /* 1px is to compensate for the border of the textarea */
`;
