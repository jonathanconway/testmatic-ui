import { Button } from "../button";
import { runResultEmoji } from "../run";
import { itemId } from "../utils";
import {
  ProjectExplorerItem,
  ProjectExplorerItemActions,
  ProjectExplorerItemMain,
  ProjectExplorerListBox,
  ProjectExplorerSection,
  ProjectExplorerSubheading,
} from "./project-explorer.styles";
import { Link } from "react-router-dom";
import { Project, projectGetTestRunLatest } from "testmatic";

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
  return (
    <ProjectExplorerListBox>
      <ProjectExplorerSection>
        <ProjectExplorerSubheading>
          Tests <Button onClick={onClickTestAdd}>Add</Button>
        </ProjectExplorerSubheading>
        <div>
          {selectedItemId === "test_new" && (
            <ProjectExplorerItem key={"test_new"} selected title="New test">
              <ProjectExplorerItemMain>
                <span>✨ </span>
                <span>New test</span>
              </ProjectExplorerItemMain>
              <ProjectExplorerItemActions>
                <Button title="Delete" size="small">
                  🗑️
                </Button>
              </ProjectExplorerItemActions>
            </ProjectExplorerItem>
          )}

          {project?.tests.map((test) => (
            <ProjectExplorerItem
              key={test.name}
              selected={itemId(test) === selectedItemId}
              title={test.title}
            >
              <ProjectExplorerItemMain>
                <span>🧪 </span>
                <Link to={`/${itemId(test)}`}>{test.title}</Link>
              </ProjectExplorerItemMain>
              <ProjectExplorerItemActions>
                {runResultEmoji(projectGetTestRunLatest(test)?.result)}

                <Button title="Delete" size="small">
                  🗑️
                </Button>
              </ProjectExplorerItemActions>
            </ProjectExplorerItem>
          ))}
        </div>
      </ProjectExplorerSection>

      <ProjectExplorerSection>
        <ProjectExplorerSubheading>
          Tags
          <Button onClick={onClickTagAdd}>Add</Button>
        </ProjectExplorerSubheading>
        <div>
          {selectedItemId === "tag_new" && (
            <ProjectExplorerItem key={"tag_new"} selected title="New tag">
              <ProjectExplorerItemMain>
                <span>✨ </span>
                <span>New tag</span>
              </ProjectExplorerItemMain>
            </ProjectExplorerItem>
          )}

          {project?.tags.map((tag) => (
            <ProjectExplorerItem
              key={tag.name}
              selected={itemId(tag) === selectedItemId}
              title={tag.title}
            >
              <ProjectExplorerItemMain>
                <span>🏷️ </span>
                <Link to={`/${itemId(tag)}`}>{tag.title}</Link>
              </ProjectExplorerItemMain>
            </ProjectExplorerItem>
          ))}
        </div>
      </ProjectExplorerSection>
    </ProjectExplorerListBox>
  );
}
