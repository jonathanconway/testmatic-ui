import { ReactNode } from "react";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import * as Styled from "./app.styles";

interface AppProps {
  readonly children: ReactNode;
}

export function App(props: AppProps) {
  return (
    <Styled.Body>
      <AppHeader />

      <Styled.Main>{props.children}</Styled.Main>

      <AppFooter />
    </Styled.Body>
  );
}
