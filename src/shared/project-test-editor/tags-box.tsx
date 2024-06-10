import { ListBox } from "../list-box";
import { Link } from "react-router-dom";
import { Test } from "testmatic";

export interface TagsBoxProps {
  readonly test: Test;
}

export function TagsBox(props: TagsBoxProps) {
  return (
    <ListBox>
      {props.test.tags.map((tag) => (
        <div>
          🏷️&nbsp;
          <Link to={`/tag_${tag.name}`}>{tag.title}</Link>
        </div>
      ))}
    </ListBox>
  );
}
