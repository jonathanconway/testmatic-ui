import { HTMLProps } from "../utils";
import { H1, H2, H3 } from "./heading.styles";

export interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  readonly level: 1 | 2 | 3;
}

export function Heading(props: HeadingProps) {
  switch (props.level) {
    case 1:
      return <H1 {...props} />;
    case 2:
      return <H2 {...props} />;
    case 3:
      return <H3 {...props} />;
  }
}
