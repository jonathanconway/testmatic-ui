import { runResultEmoji } from "../run";
import { itemId } from "../utils";
import {
  ProjectExplorerItem,
  ProjectExplorerListBox,
  ProjectExplorerSubheading,
} from "./project-explorer.styles";
import { Link } from "react-router-dom";
import { Project, projectGetTestRunLatest } from "testmatic";

interface ProjectExplorerProps {
  readonly project?: Project;
  readonly selectedItemId?: string;
}

export function ProjectExplorer({
  project,
  selectedItemId,
}: ProjectExplorerProps) {
  return (
    <div>
      <ProjectExplorerListBox>
        <ProjectExplorerSubheading>Tests</ProjectExplorerSubheading>
        <div>
          {project?.tests.map((test) => (
            <ProjectExplorerItem
              key={test.name}
              selected={itemId(test) === selectedItemId}
              title={test.title}
            >
              <span>🧪 </span>
              <Link to={`/${itemId(test)}`}>{test.title}</Link>
              <span>
                {runResultEmoji(projectGetTestRunLatest(test)?.result)}
              </span>
            </ProjectExplorerItem>
          ))}
        </div>

        <ProjectExplorerSubheading>Tags</ProjectExplorerSubheading>
        <div>
          {project?.tags.map((tag) => (
            <ProjectExplorerItem
              key={tag.name}
              selected={itemId(tag) === selectedItemId}
              title={tag.title}
            >
              <span>🏷️ </span>
              <Link to={`/${itemId(tag)}`}>{tag.title}</Link>
            </ProjectExplorerItem>
          ))}
        </div>
      </ProjectExplorerListBox>
    </div>
  );
}
