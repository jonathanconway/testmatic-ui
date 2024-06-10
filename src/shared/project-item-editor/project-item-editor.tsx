import { ProjectTagEditor } from "../project-tag-editor";
import { ProjectTestEditor } from "../project-test-editor";
import { ProjectItemEditorContainer } from "./project-item-editor.styles";
import { Tag, Test, isTag, isTest } from "testmatic";

interface ProjectItemEditorProps {
  readonly item?: Test | Tag;
  readonly onClose: VoidFunction;
}

export function ProjectItemEditor({ item, onClose }: ProjectItemEditorProps) {
  return (
    <ProjectItemEditorContainer>
      {item && isTest(item) && (
        <ProjectTestEditor test={item} onCloseClick={onClose} />
      )}
      {item && isTag(item) && <ProjectTagEditor tag={item} />}
    </ProjectItemEditorContainer>
  );
}
