import express from "express";
import { projectMdRead } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function getProject(app: express.Express) {
  app.get("/project", (_, res) => {
    const project = projectMdRead(getProjectPathCwd());

    res.json(project);
  });
}
