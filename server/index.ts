import { getProject } from "./get-project";
import cors from "cors";
import express from "express";

const app = express();
const port = 3100;

app.use(cors());

app.get(getProject.route, getProject.handler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
