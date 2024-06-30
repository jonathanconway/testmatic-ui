import express from "express";
import { runResult } from "testmatic/files";

export function postTestRunUpdateResult(app: express.Express) {
  app.post("/tests/:testName/runs/:runDateTime/result", (req, res) => {
    const { testName: testNameOrTitle, runDateTime } = req.params;
    const { result: runResultValue } = req.body;

    runResult({
      testNameOrTitle,
      runResultValue,
      runDateTime,
    });

    res.sendStatus(200);
  });
}
