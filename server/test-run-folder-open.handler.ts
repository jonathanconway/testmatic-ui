import express from "express";
import { cliRunOpen } from "testmatic/cli";

export function putTestRunFolderOpen(app: express.Express) {
  app.put("/tests/:testName/runs/:dateTime", (req, res) => {
    cliRunOpen(req.params.testName, req.params.dateTime);

    res.sendStatus(200);
  });
}
