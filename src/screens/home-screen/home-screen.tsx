import logo from "../../logo.svg";
import { Button, ProjectExplorer } from "../../shared";
import { useHomeScreen } from "./home-screen.hooks";
import {
  Body,
  H1,
  Header,
  HeaderActions,
  LogoAndTitle,
  Main,
} from "./home-screen.styles";
import { Outlet } from "react-router-dom";

export function HomeScreen() {
  const { project, selectedItemId, onClickTagAdd, onClickTestAdd } =
    useHomeScreen();

  return (
    <Body>
      <Header>
        <LogoAndTitle>
          <img src={logo} alt="Testmatic logo" width={24} />
          <H1>Testmatic</H1>
        </LogoAndTitle>

        <HeaderActions>
          <Button>Import</Button>
          <Button>Export</Button>
        </HeaderActions>
      </Header>

      <Main>
        <ProjectExplorer
          project={project}
          selectedItemId={selectedItemId}
          onClickTagAdd={onClickTagAdd}
          onClickTestAdd={onClickTestAdd}
        />

        <Outlet />
      </Main>
    </Body>
  );
}
