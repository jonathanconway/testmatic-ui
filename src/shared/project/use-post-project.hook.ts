import { showNotification } from "../notification";
import { useGetProject } from "./use-get-project.hook";
import { useMutation } from "@tanstack/react-query";
import { pick } from "lodash";
import { Project, ProjectView } from "testmatic";

async function postProject(project: Project) {
  await fetch("http://localhost:3100/project", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}

function pickProject(projectOrProjectView: Project | ProjectView): Project {
  return pick(projectOrProjectView, ["tests", "tags"]) as Project;
}

export function usePostProject() {
  const mutationFn = (projectOrProjectView: Project | ProjectView) =>
    postProject(pickProject(projectOrProjectView));

  const { refetch } = useGetProject();

  const onSuccess = () => {
    refetch();
    showNotification({
      message: "Project saved.",
      type: "success",
    });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
