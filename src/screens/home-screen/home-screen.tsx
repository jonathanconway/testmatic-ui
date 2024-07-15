import { Outlet } from "react-router-dom";

import { App, ProjectExplorer } from "../../shared";

import * as Styled from "./home-screen.styles";

export function HomeScreen() {
  return (
    <App>
      <ProjectExplorer />
      <Styled.OutletContainer>
        <Outlet />
      </Styled.OutletContainer>
    </App>
  );
}
