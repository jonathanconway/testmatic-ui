import { ProjectExplorerTags } from "./project-explorer-tags";
import { ProjectExplorerTests } from "./project-explorer-tests";
import { ProjectExplorerListBox } from "./project-explorer.styles";

export function ProjectExplorer() {
  return (
    <ProjectExplorerListBox>
      <ProjectExplorerTests />
      <ProjectExplorerTags />
    </ProjectExplorerListBox>
  );
}
