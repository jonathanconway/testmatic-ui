import logo from "../../logo.svg";
import { Button, ProjectExplorer, ProjectItemEditor } from "../../shared";
import { useHomeScreen } from "./home-screen.hooks";
import {
  Body,
  H1,
  Header,
  HeaderActions,
  LogoAndTitle,
  Main,
} from "./home-screen.styles";

export function HomeScreen() {
  const {
    project,
    selectedItemId,
    selectedItem,
    onClickTagAdd,
    onClickTestAdd,
    onCloseClick,
  } = useHomeScreen();

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

        <ProjectItemEditor item={selectedItem} onClose={onCloseClick} />
      </Main>
    </Body>
  );
}
