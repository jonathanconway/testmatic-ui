import styled from "styled-components";

import { ZIndexes } from "../z-indexes";

export const ToggleButton = styled.label<{ readonly $isSelected?: boolean }>`
  display: inline-flex;
  padding: 0.125rem 0.5rem;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 0.85rem;
  border-top: solid 1px;
  border-right: none;
  border-bottom: solid 1px;
  border-left: none;
  border-color: #d0d0d0;

  &:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-left: solid 1px #d0d0d0;
  }

  &:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-right: solid 1px #d0d0d0;
  }

  &:not(:last-child) {
    border-right: solid 1px #d0d0d0;
  }

  &:not(:first-child) {
    border-left: solid 1px #d0d0d0;
    margin-left: -1px;
  }

  &:not(:disabled) {
    &,
    & {
      cursor: pointer;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: #efefef;
    }

    ${({ $isSelected }) =>
      `${
        $isSelected
          ? `
      background-color: #efefef;
      border: solid 1px blue;
      z-index: ${ZIndexes.ToggleButtonSelected};
    `
          : ""
      }`}
  }

  input {
    visibility: hidden;
    position: absolute;
  }
`;
