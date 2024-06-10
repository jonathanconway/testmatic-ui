import { useGetProject } from "../project/use-get-project.hook";
import { itemId } from "../utils";
import {
  H2,
  H3,
  ProjectTagEditorContainer,
  TestsList,
  TestsListItem,
} from "./project-tag-editor.styles";
import { Link } from "react-router-dom";
import { Tag, getTestsReferencingTag } from "testmatic";

interface ProjectTagEditorProps {
  readonly tag: Tag;
}

export function ProjectTagEditor({ tag }: ProjectTagEditorProps) {
  const { data: project } = useGetProject();
  console.log({ project });
  return (
    <ProjectTagEditorContainer>
      <H2>Tag: {tag.title}</H2>

      <H3>Tests</H3>

      {project && (
        <TestsList>
          {getTestsReferencingTag(project.tests, tag).map((test) => (
            <TestsListItem>
              <div>
                🧪&nbsp;
                <Link to={`/${itemId(test)}`}>{test.title}</Link>
              </div>
            </TestsListItem>
          ))}
        </TestsList>
      )}
    </ProjectTagEditorContainer>
  );
}
