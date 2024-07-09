import { Outlet } from "react-router-dom";

import logo from "../../logo.svg";
import { ExportButton, ImportButton, ProjectExplorer } from "../../shared";

import {
  Body,
  H1,
  Header,
  HeaderActions,
  LogoAndTitle,
  Main,
} from "./home-screen.styles";

export function HomeScreen() {
  return (
    <Body>
      <Header>
        <LogoAndTitle>
          <img src={logo} alt="Testmatic logo" width={24} />
          <H1>Testmatic</H1>
        </LogoAndTitle>

        <HeaderActions>
          <ImportButton />
          <ExportButton />
        </HeaderActions>
      </Header>

      <Main>
        <ProjectExplorer />

        <Outlet />
      </Main>
    </Body>
  );
}
