import { Link } from "react-router-dom";

import { Button } from "../../button";
import { IconButton } from "../../icon-button";
import { TAG_NEW_NAME, tagEditorRoute } from "../../tag-editor";
import { Tooltip } from "../../tooltip";
import * as Styled from "../project-explorer.styles";

import { useProjectExplorerTags } from "./use-project-explorer-tags.hook";

export function ProjectExplorerTags() {
  const { project, tagName, handleTagAddClick, handleTagDeleteClick } =
    useProjectExplorerTags();

  return (
    <Styled.ProjectExplorerSection>
      <Styled.ProjectExplorerSubheading>
        Tags
        <Button onClick={handleTagAddClick}>Add</Button>
      </Styled.ProjectExplorerSubheading>
      <div>
        {tagName === TAG_NEW_NAME && (
          <Styled.ProjectExplorerItem
            key={TAG_NEW_NAME}
            $selected
            title="New tag"
          >
            <Styled.ProjectExplorerItemMain>
              <span>✨ </span>
              <span>New tag</span>
            </Styled.ProjectExplorerItemMain>
          </Styled.ProjectExplorerItem>
        )}

        {project?.tags.map((tag, index) => (
          <Styled.ProjectExplorerItem
            key={tag.name + index}
            $selected={tag.name === tagName}
          >
            <Styled.ProjectExplorerItemMain>
              <span>🏷️ </span>
              <Link to={tagEditorRoute(tag.name)}>{tag.title}</Link>
            </Styled.ProjectExplorerItemMain>

            <Styled.ProjectExplorerItemActions>
              <Tooltip contents="Delete tag">
                <IconButton
                  size="small"
                  icon="delete"
                  onClick={handleTagDeleteClick(tag)}
                />
              </Tooltip>
            </Styled.ProjectExplorerItemActions>
          </Styled.ProjectExplorerItem>
        ))}
      </div>
    </Styled.ProjectExplorerSection>
  );
}
