import { Button, ProjectExplorer, ProjectItemEditor } from "../../shared";
import { useHomeScreen } from "./home-screen.hooks";
import { Body, H1, Header, HeaderActions, Main } from "./home-screen.styles";

export function HomeScreen() {
  const { project, selectedItemId, selectedItem } = useHomeScreen();

  return (
    <Body>
      <Header>
        <H1>Testmatic</H1>

        <HeaderActions>
          <Button>Import</Button>
          <Button>Export</Button>
        </HeaderActions>
      </Header>

      <Main>
        <ProjectExplorer project={project} selectedItemId={selectedItemId} />

        <ProjectItemEditor item={selectedItem} />
      </Main>
    </Body>
  );
}
