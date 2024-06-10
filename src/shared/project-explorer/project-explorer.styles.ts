import styled from "styled-components";

export const ProjectExplorerListBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ProjectExplorerSubheading = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  color: gray;
  padding: 0.5rem 0;
`;

export const ProjectExplorerItem = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 0.125rem 0.25rem;
  display: flex;
  gap: 0.25rem;

  font-size: 0.9rem;
  border-radius: 0.5rem;

  & > a {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;

    &:active {
      color: blue;
    }
  }

  ${({ selected }) =>
    selected
      ? `
background-color: #efefef;
border: solid 1px silver;

a {
  text-decoration: none;
  color: unset;
}

`
      : `
background-color: white;
border: solid 1px white;

a {
  color: blue;
}
      `}
`;
