import { getProject } from "./get-project.handler";
import { postProject } from "./post-project.handler";
import cors from "cors";
import express from "express";
import { putTestRunFolderOpen } from "./test-run-folder-open.handler";

const app = express();
const port = 3100;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

getProject(app);
postProject(app);
putTestRunFolderOpen(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
