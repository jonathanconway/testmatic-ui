import express from "express";
import { projectMdRead } from "testmatic/files";

export function getProject(app: express.Express) {
  app.get("/project", (req, res) => {
    const project = projectMdRead();

    res.json(project);
  });
}
