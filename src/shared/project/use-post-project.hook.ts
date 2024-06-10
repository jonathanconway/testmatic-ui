import { useMutation } from "@tanstack/react-query";
import { pick } from "lodash";
import { Project, ProjectView } from "testmatic";

async function postProject(project: Project) {
  await fetch("http://localhost:3100/project", {
    method: "POST",
    body: JSON.stringify(project),
  });
}

function pickProject(projectOrProjectView: Project | ProjectView): Project {
  return pick(projectOrProjectView, ["tests", "tags"]) as Project;
}

export function usePostProject() {
  const mutationFn = (projectOrProjectView: Project | ProjectView) =>
    postProject(pickProject(projectOrProjectView));

  return useMutation({
    mutationFn,
  });
}
