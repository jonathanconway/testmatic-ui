import { Tag, getTestsReferencingTag } from "testmatic";

import { useProject } from "../../../hooks";
import { Icon, IconNames } from "../../icon";

import * as Styled from "./tag-tooltip-contents.styles";

interface TagTooltipContentsProps {
  readonly tag: Tag;
}

export function TagTooltipContents(props: TagTooltipContentsProps) {
  const { project } = useProject();

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

          <Styled.UnorderedList>
            {props.tag.links.map((link) => (
              <li key={link.href}>
                <Icon icon={IconNames.Link} /> {link.title ?? link.href}
              </li>
            ))}
          </Styled.UnorderedList>
        </div>
      )}

      {tagTests.length > 0 && (
        <div>
          <div>
            <strong>Tests</strong>
          </div>

          <Styled.UnorderedList>
            {tagTests.map((test) => (
              <li key={test.name}>
                <Icon icon={IconNames.Test} /> {test.title}
              </li>
            ))}
          </Styled.UnorderedList>
        </div>
      )}
    </Styled.Container>
  );
}
