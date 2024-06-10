import { ListBox } from "../list-box";
import { Test } from "testmatic";

export interface LinksBoxProps {
  readonly test: Test;
}

export function LinksBox(props: LinksBoxProps) {
  return (
    <ListBox>
      {props.test.links.map((link) => (
        <div>
          🔗&nbsp;
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.title ?? link.href}
          </a>
        </div>
      ))}
    </ListBox>
  );
}
