import { H1, H2, H3 } from "./heading.styles";
import { HTMLProps } from "react";

export interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  readonly level: 1 | 2 | 3;
}

export function Heading(props: HeadingProps) {
  const { level, ...restProps } = props;
  switch (props.level) {
    case 1:
      return <H1 {...restProps} />;
    case 2:
      return <H2 {...restProps} />;
    case 3:
      return <H3 {...restProps} />;
  }
}
