import { useMutation } from "@tanstack/react-query";
import { pick } from "lodash";
import { Project, ProjectView } from "testmatic";

import { showNotification } from "../../notification";

import { useGetProject } from "./use-get-project.hook";

interface UsePostProjectParams {
  readonly enabled: boolean;
}

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

export function usePostProject(params: UsePostProjectParams) {
  const mutationFn = (projectOrProjectView: Project | ProjectView) =>
    postProject(pickProject(projectOrProjectView));

  const { refetch } = useGetProject({ enabled: params.enabled });

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
