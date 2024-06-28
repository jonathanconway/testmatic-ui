import {
  USE_GET_PROJECT_QUERY_KEY,
  useGetProject,
} from "./use-get-project.hook";
import { usePostProject } from "./use-post-project.hook";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectView } from "testmatic";

export function useProject() {
  const { data: project } = useGetProject();

  const { setQueryData } = useQueryClient();

  const { mutate: postProject } = usePostProject();

  const saveProject = (project: ProjectView) => {
    postProject(project);
    setQueryData([USE_GET_PROJECT_QUERY_KEY], () => project);
  };

  return {
    project,
    saveProject,
  };
}
