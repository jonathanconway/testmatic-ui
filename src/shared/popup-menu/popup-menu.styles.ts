import styled from "styled-components";

export const AnchorContainer = styled.span`
  display: contents;
`;

export const MenuContainer = styled.div`
  border: solid 1px silver;
  border-radius: 0.25rem;
  background-color: white;
  box-shadow: 2px 5px 15px 2px #dedede;
  margin-top: 0.5rem;
`;

export const MenuItem = styled.div`
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
