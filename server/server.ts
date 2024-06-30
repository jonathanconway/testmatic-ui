import cors from "cors";
import express from "express";

import { getProject } from "./get-project.handler";
import { postProject } from "./post-project.handler";
import { putTestRunFolderOpen } from "./test-run-folder-open.handler";
import { getTestRunRecordings } from "./test-run-recordings.handler";
import { postTestRunUpdateResult } from "./test-run-update-result";

const app = express();
const port = 3100;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

getProject(app);
postProject(app);

postTestRunUpdateResult(app);
getTestRunRecordings(app);
putTestRunFolderOpen(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
