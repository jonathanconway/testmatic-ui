import { ReactNode } from "react";

import * as Styled from "./app-workspace.styles";

export interface AppWorkspaceProps {
  readonly children?: ReactNode;
}

export function AppWorkspace(props: AppWorkspaceProps) {
  return <Styled.AppWorkspace>{props.children}</Styled.AppWorkspace>;
}
