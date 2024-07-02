import express from "express";
import { runOpen } from "testmatic/files";

import { getProjectPathCwd } from "./get-project-path-cwd";

export function putTestRunFolderOpen(app: express.Express) {
  app.put("/tests/:testName/runs/:runDateTime", (req, res) => {
    const { testName: testNameOrTitle, runDateTime } = req.params;

    const projectPath = getProjectPathCwd();

    runOpen({
      testNameOrTitle,
      runDateTime,
      projectPath,
    });

    res.sendStatus(200);
  });
}
