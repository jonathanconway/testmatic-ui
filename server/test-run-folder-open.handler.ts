import express from "express";
import { runOpen } from "testmatic/files";

export function putTestRunFolderOpen(app: express.Express) {
  app.put("/tests/:testName/runs/:runDateTime", (req, res) => {
    const { testName: testNameOrTitle, runDateTime } = req.params;

    runOpen({
      testNameOrTitle,
      runDateTime,
    });

    res.sendStatus(200);
  });
}
