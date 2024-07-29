import styled from "styled-components";

import { controlBorder, controlPadding } from "../../control/control.mixins";
import { textBoxHoverBorder } from "../text-box-hover-border.mixin";
import { textBoxPlaceholder } from "../text-box-placeholder.mixin";

export const TextAreaContainer = styled.div<{ readonly $outdent?: boolean }>`
  position: relative;

  ${({ $outdent }) => `
    ${
      $outdent
        ? `
    margin: 0 -5px;
    `
        : ""
    }
  `}
`;

export const TextArea = styled.textarea<{
  readonly $isEmpty: boolean;
  readonly $hoverBorder?: boolean;
  readonly $outdent?: boolean;
}>`
  ${controlBorder}
  ${controlPadding}
  ${textBoxPlaceholder}

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  resize: none;
  font-size: inherit;
  font-weight: inherit;

  ${({ $hoverBorder }) => `
    ${
      $hoverBorder
        ? `
  ${textBoxHoverBorder}
    
    `
        : ""
    }
  `}

  ${({ $outdent }) => `
    ${
      $outdent
        ? `
  width: calc(100% - 5px);
    
    `
        : ""
    }
  `}
`;

export const Sizer = styled.span`
  visibility: hidden;
  display: flex;
  white-space: pre;
  font-size: inherit;
  font-weight: inherit;

  padding: calc(
    0.25rem + 1px
  ); /* 1px is to compensate for the border of the textarea */
`;
