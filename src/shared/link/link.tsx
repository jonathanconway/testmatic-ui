import { LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { ReactNode } from "react";
import { To } from "react-router-dom";
import * as Styled from "./link.styles";

interface LinkProps extends ReactRouterLinkProps {
  readonly to: To;
  readonly children?: ReactNode;
}

export function Link(props: LinkProps) {
  return <Styled.Link {...props} />;
}
