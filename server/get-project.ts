import { RequestHandler } from "express";
import { projectMdRead, readProjectFile } from "testmatic/files";

const handler: RequestHandler = (req, res) => {
  const cwd = process.cwd();

  const project = projectMdRead();

  res.json(project);
};

export const getProject = {
  route: "/project",
  handler,
};
