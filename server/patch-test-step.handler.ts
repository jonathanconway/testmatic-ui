import express from "express";
import { projectUpdateTestStep } from "testmatic";
import { projectMdRead, projectMdWrite } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function postProject(app: express.Express) {
  app.post("/project/:testName/steps/:stepIndex", (req, res) => {
    const project = projectMdRead(getProjectPathCwd());

    if (!project) {
      res.sendStatus(500);
      return;
    }

    const updatedProject = projectUpdateTestStep({
      project,
      testName: req.params.testName,
      lookupStepIndex: Number(req.params.stepIndex),
      updatedStepText: req.body,
    });

    projectMdWrite(updatedProject, getProjectPathCwd());

    res.sendStatus(200);
  });
}
