import express from "express";
import { runResult } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function postTestRunUpdateResult(app: express.Express) {
  app.post("/tests/:testName/runs/:runDateTime/result", (req, res) => {
    const { testName: lookupTestNameOrTitle, runDateTime: lookupRunDateTime } =
      req.params;
    const { result: runResultValue } = req.body;

    const projectPath = getProjectPathCwd();

    runResult({
      lookupTestNameOrTitle,
      runResultValue,
      lookupRunDateTime,
      projectPath,
    });

    res.sendStatus(200);
  });
}
