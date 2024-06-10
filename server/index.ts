import { getProject } from "./get-project";
import { postProject } from "./post-project";
import cors from "cors";
import express from "express";

const app = express();
const port = 3100;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

getProject(app);
postProject(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
