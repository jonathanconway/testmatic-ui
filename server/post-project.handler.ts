import express from "express";
import { Project, createProjectView } from "testmatic";
import { projectMdWrite } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function postProject(app: express.Express) {
  app.post("/project", (req, res) => {
    const project = createProjectView(req.body as Project);

    projectMdWrite(project, getProjectPathCwd());

    res.sendStatus(200);
  });
}
