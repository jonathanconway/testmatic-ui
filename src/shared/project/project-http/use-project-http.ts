import { useQueryClient } from "@tanstack/react-query";
import { ProjectView } from "testmatic";

import { emptyProjectView } from "../empty-project";
import { UseProjectResult } from "../use-project.types";

import {
  USE_GET_PROJECT_QUERY_KEY,
  useGetProject,
} from "./use-get-project.hook";
import { usePostProject } from "./use-post-project.hook";

interface UseProjectHttpParams {
  readonly enabled: boolean;
}

export function useProjectHttp(params: UseProjectHttpParams): UseProjectResult {
  const { data, refetch: refetchProject } = useGetProject({
    enabled: params.enabled,
  });

  const project: ProjectView = (data as ProjectView) ?? emptyProjectView;

  const { setQueryData } = useQueryClient();

  const { mutate: postProject } = usePostProject({ enabled: params.enabled });

  const saveProject = (project: ProjectView) => {
    postProject(project);
    setQueryData([USE_GET_PROJECT_QUERY_KEY], () => project);
  };

  return {
    project,
    saveProject,
    refetchProject,
  };
}
