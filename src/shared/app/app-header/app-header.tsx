import { APP_INFO } from "../../../app-info";
import logo from "../../../logo.svg";
import { packageInfo } from "../../../package-info";

import * as Styled from "./app-header.styles";
import { ExportButton, ImportButton } from "./import-export";

export function AppHeader() {
  return (
    <Styled.Header>
      <Styled.Link to="/">
        <Styled.LogoAndTitle>
          <img src={logo} alt={`${packageInfo.name} logo`} width={24} />
          <Styled.H1>{APP_INFO.title}</Styled.H1>
        </Styled.LogoAndTitle>
      </Styled.Link>

      <Styled.HeaderActions>
        <ImportButton />
        <ExportButton />
      </Styled.HeaderActions>
    </Styled.Header>
  );
}
