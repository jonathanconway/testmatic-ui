import express from "express";
import { isError } from "lodash";
import { projectAddTestStep } from "testmatic";
import { projectMdRead, projectMdWrite } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function postTestStep(app: express.Express) {
  app.post("/project/:testName/steps/:stepIndex", (req, res) => {
    const project = projectMdRead(getProjectPathCwd());

    if (isError(project)) {
      res.sendStatus(500);
      return;
    }

    const updatedProject = projectAddTestStep({
      project,
      lookupTestNameOrTitle: req.params.testName,
      lookupBeforeStepIndex: Number(req.params.stepIndex),
      newStep: req.body,
    });

    if (isError(updatedProject)) {
      res.sendStatus(500);
      return;
    }

    projectMdWrite(updatedProject, getProjectPathCwd());

    res.sendStatus(200);
  });
}
