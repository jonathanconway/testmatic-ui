import styled from "styled-components";

import { ItemProps } from "../../item";

export const MenuItem = styled.div<ItemProps>`
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  &:hover,
  &:focus {
    background-color: #efefef;
  }
`;
