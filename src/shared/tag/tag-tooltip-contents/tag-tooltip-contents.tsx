import { useGetProject } from "../../project";
import * as Styled from "./tag-tooltip-contents.styles";
import { Tag, getTestsReferencingTag } from "testmatic";

interface TagTooltipContentsProps {
  readonly tag: Tag;
}

export function TagTooltipContents(props: TagTooltipContentsProps) {
  const { data: project } = useGetProject();

  const tests = project?.tests ?? [];
  const tag = props.tag;
  const tagTests = getTestsReferencingTag(tests, tag).slice(0, 5);

  return (
    <Styled.Container>
      <strong>🏷️ {props.tag.title}</strong>

      {props.tag.description && <div>{props.tag.description}</div>}

      {props.tag.tagType && (
        <table cellPadding={0} cellSpacing={0}>
          <tr>
            <th align="left">Type:</th>
            <td>{props.tag.tagType}</td>
          </tr>
        </table>
      )}

      {props.tag.links.length > 0 && (
        <div>
          <div>
            <strong>Links</strong>
          </div>

          <ul>
            {props.tag.links.map((link) => (
              <li key={link.href}>{link.title ?? link.href}</li>
            ))}
          </ul>
        </div>
      )}

      {tagTests.length > 0 && (
        <div>
          <div>
            <strong>Tests</strong>
          </div>

          <Styled.UnorderedList>
            {tagTests.map((test) => (
              <li key={test.name}>{test.title}</li>
            ))}
          </Styled.UnorderedList>
        </div>
      )}
    </Styled.Container>
  );
}
