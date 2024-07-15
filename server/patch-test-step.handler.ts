import express from "express";
import { isError } from "lodash";
import { projectUpdateTestStep } from "testmatic";
import { projectMdRead, projectMdWrite } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function patchTestStep(app: express.Express) {
  app.patch("/project/:testName/steps/:stepIndex", (req, res) => {
    const project = projectMdRead(getProjectPathCwd());

    if (isError(project)) {
      res.sendStatus(500);
      return;
    }

    const updatedProject = projectUpdateTestStep({
      project,
      lookupTestNameOrTitle: req.params.testName,
      lookupStepIndex: Number(req.params.stepIndex),
      updatedStepText: req.body,
    });

    if (isError(updatedProject)) {
      res.sendStatus(500);
      return;
    }

    projectMdWrite(updatedProject, getProjectPathCwd());

    res.sendStatus(200);
  });
}
