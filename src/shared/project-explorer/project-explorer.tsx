import { Link } from "react-router-dom";
import { Project } from "testmatic";

import { Button } from "../button";
import { IconButton } from "../icon-button";
import { TAG_NEW_NAME, tagEditorRoute } from "../tag-editor";
import { TEST_NEW_NAME } from "../test-editor";
import { Tooltip } from "../tooltip";

import { ProjectExplorerTestItem } from "./project-explorer-test-item";
import {
  ProjectExplorerItem,
  ProjectExplorerItemActions,
  ProjectExplorerItemMain,
  ProjectExplorerListBox,
  ProjectExplorerSection,
  ProjectExplorerSubheading,
} from "./project-explorer.styles";
import { useProjectExplorer } from "./use-project-explorer.hook";

interface ProjectExplorerProps {
  readonly project?: Project;
  readonly selectedItemId?: string;

  readonly onClickTestAdd: VoidFunction;
  readonly onClickTagAdd: VoidFunction;
}

export function ProjectExplorer({
  project,
  selectedItemId,
  onClickTestAdd,
  onClickTagAdd,
}: ProjectExplorerProps) {
  const { selected, handleCancelNewTestClick, handleDeleteTagClick } =
    useProjectExplorer();

  return (
    <ProjectExplorerListBox>
      <ProjectExplorerSection>
        <ProjectExplorerSubheading>
          Tests <Button onClick={onClickTestAdd}>Add</Button>
        </ProjectExplorerSubheading>

        <div>
          {selectedItemId === TEST_NEW_NAME && (
            <ProjectExplorerItem key={TEST_NEW_NAME} $selected title="New test">
              <ProjectExplorerItemMain>
                <span>✨ </span>
                <span>New test</span>
              </ProjectExplorerItemMain>

              <ProjectExplorerItemActions>
                <Tooltip contents="Cancel new test">
                  <IconButton
                    size="small"
                    icon="delete"
                    onClick={handleCancelNewTestClick}
                  />
                </Tooltip>
              </ProjectExplorerItemActions>
            </ProjectExplorerItem>
          )}

          {project?.tests.map((test) => (
            <ProjectExplorerTestItem key={test.name} test={test} />
          ))}
        </div>
      </ProjectExplorerSection>

      <ProjectExplorerSection>
        <ProjectExplorerSubheading>
          Tags
          <Button onClick={onClickTagAdd}>Add</Button>
        </ProjectExplorerSubheading>
        <div>
          {selectedItemId === TAG_NEW_NAME && (
            <ProjectExplorerItem key={TAG_NEW_NAME} $selected title="New tag">
              <ProjectExplorerItemMain>
                <span>✨ </span>
                <span>New tag</span>
              </ProjectExplorerItemMain>
            </ProjectExplorerItem>
          )}

          {project?.tags.map((tag) => (
            <ProjectExplorerItem
              key={tag.name}
              $selected={tag.name === selected.tagName}
            >
              <ProjectExplorerItemMain>
                <span>🏷️ </span>
                <Link to={tagEditorRoute(tag.name)}>{tag.title}</Link>
              </ProjectExplorerItemMain>

              <ProjectExplorerItemActions>
                <Tooltip contents="Delete tag">
                  <IconButton
                    size="small"
                    icon="delete"
                    onClick={handleDeleteTagClick(tag)}
                  />
                </Tooltip>
              </ProjectExplorerItemActions>
            </ProjectExplorerItem>
          ))}
        </div>
      </ProjectExplorerSection>
    </ProjectExplorerListBox>
  );
}
