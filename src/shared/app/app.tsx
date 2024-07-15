import { ReactNode } from "react";

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
    </Styled.Body>
  );
}
