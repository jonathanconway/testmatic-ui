import { Button } from "../../button";
import { IconNames } from "../../icon";
import { IconButton } from "../../icon-button";
import { Link } from "../../link";
import { tagEditorRoute } from "../../tag-editor";
import { Tooltip } from "../../tooltip";
import * as Styled from "../project-explorer.styles";

import { ProjectExplorerTagsIds } from "./project-explorer-tags.const";
import { useProjectExplorerTags } from "./use-project-explorer-tags.hook";

export function ProjectExplorerTags() {
  const { project, tagName, handleTagAddClick, handleTagDeleteClick } =
    useProjectExplorerTags();

  return (
    <Styled.ProjectExplorerSection id={ProjectExplorerTagsIds.Section}>
      <Styled.ProjectExplorerSubheading>
        Tags
        <Button onClick={handleTagAddClick}>Add</Button>
      </Styled.ProjectExplorerSubheading>

      <div>
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
                  icon={IconNames.Delete}
                  onClick={handleTagDeleteClick(tag.name)}
                />
              </Tooltip>
            </Styled.ProjectExplorerItemActions>
          </Styled.ProjectExplorerItem>
        ))}
      </div>
    </Styled.ProjectExplorerSection>
  );
}
