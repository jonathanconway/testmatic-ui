import styled from "styled-components";

export const ProjectExplorerListBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 1rem;
`;

export const ProjectExplorerSection = styled.div``;

export const ProjectExplorerSubheading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  color: gray;
  padding: 0.5rem 0;
`;

export const ProjectExplorerItem = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  padding: 0.125rem 0.25rem;
  justify-content: space-between;
  gap: 0.25rem;
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

export const ProjectExplorerItemActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const ProjectExplorerItemMain = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.9rem;
`;
