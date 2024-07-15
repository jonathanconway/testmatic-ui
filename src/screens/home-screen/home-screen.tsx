import { Outlet } from "react-router-dom";

import { App, ProjectExplorer } from "../../shared";

export function HomeScreen() {
  return (
    <App>
      <ProjectExplorer />
      <Outlet />
    </App>
  );
}
