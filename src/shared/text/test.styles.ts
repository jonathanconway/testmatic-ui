import { TextType, TextTypes } from "./text.types";
import styled from "styled-components";

export const Text = styled.div<{ $type: TextType }>`
  ${({ $type }) => `

  ${
    $type === TextTypes.Label
      ? `
  font-size: 0.85rem;
  `
      : ""
  }

  ${
    $type === TextTypes.Error
      ? `
  font-size: 0.85rem;
  color: red;
  `
      : ""
  }

  ${
    $type === TextTypes.NestedSubHeading
      ? `
  font-size: 0.8rem;
  `
      : ""
  }

`}
`;
